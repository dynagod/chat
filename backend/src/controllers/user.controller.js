import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        if (!user) throw new ApiError(404, "User not found");
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})

        return {accessToken, refreshToken}

    } catch (error) {
        throw new ApiError(500,"Something went wrong while generating access and refresh token")
    }
}

const registerUser = asyncHandler(async (req, res) => {

    const username = req.body.username?.trim();
    const email = req.body.email?.trim();
    const name = req.body.name?.trim();
    const confirm = req.body.confirm?.trim();
    const password = req.body.password?.trim();
    
    // if (
    //     [username, email, name, confirm, password].some((field) => field?.trim() === "")
    // ) {
    //     throw new ApiError(400, "All fields are required")
    // }

    if (!username) throw new ApiError(400, "Username is required");
    if (!name) throw new ApiError(400, "Name is required");
    if (!email) throw new ApiError(400, "Email is required");
    if (!password) throw new ApiError(400, "Enter password you want to give to your jibber account");
    if (password.length < 6) throw new ApiError(400, "Length of password must be greater than 5");
    if (!confirm) throw new ApiError(400, "Confirm the password");

    if (confirm !== password) {
        throw new ApiError(400, "Password and confirm password doesnot match")
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
        throw new ApiError(409, "Username already exists");
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
        throw new ApiError(409, "Email already registered");
    }
    
    const profileLocalPath = req.file ? req.file.path : undefined;

    const profile = await uploadOnCloudinary(profileLocalPath)

    const user = await User.create({username, name, profile: profile?.url, email, password})

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(201)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, "", "User registered successfully"))

})

const loginUser = asyncHandler(async (req, res) => {

    const email = req.body.email?.trim();
    const password = req.body.password?.trim();

    if(!email) throw new ApiError(400, "Email is required");
    if(!password) throw new ApiError(400, "Password is required");

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(401, "Invalid User Credentials")
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid User Credentials")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, "", "User logged in successfully"))

})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, "", "User logged out successfully"))
})

const verifyToken = asyncHandler(async (req, res) => {
    const userData = req.user;
    if (!userData) throw new ApiError(500, "Something went wrong file fetching user data");
    return res.status(200).json(new ApiResponse(200, userData, "Authorised user"));
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized User")
    }
    
    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user = await User.findById(decodedToken?._id);
    
        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }
    
        if (incomingRefreshToken !== refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessToken, refreshToken} = generateAccessAndRefreshToken(user._id)
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {accessToken, refreshToken},
                "Access token refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }
})

export { registerUser, loginUser, logoutUser, verifyToken, refreshAccessToken }