import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    const {username, email, name, confirm, password} = req.body
    
    // if (
    //     [username, email, name, confirm, password].some((field) => field?.trim() === "")
    // ) {
    //     throw new ApiError(400, "All fields are required")
    // }

    if (!username?.trim()) throw new ApiError(400, "Username is required");
    if (!name?.trim()) throw new ApiError(400, "Username is required");
    if (!email?.trim()) throw new ApiError(400, "Email is required");
    if (password.length < 6) throw new ApiError(400, "Length of password must be greater than 5");
    if (!password?.trim()) throw new ApiError(400, "Enter password you want to give to your jibber account");
    if (!confirm?.trim()) throw new ApiError(400, "Confirm the password");

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
        throw new ApiError(409, "Username already exists");
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
        throw new ApiError(409, "Email already exists");
    }

    if (confirm !== password) {
        throw new ApiError(400, "Password and confirm password doesnot match")
    }
    
    const profileLocalPath = req.file ? req.file.path : undefined;

    const profile = await uploadOnCloudinary(profileLocalPath)

    const user = await User.create({username, name, profile: profile?.url || "", email, password})

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )

})

export { registerUser }