import dotenv from "dotenv"
import connectDB from "./db/index.js";
import { app } from "./app.js"

dotenv.config({
    path: './env'
})

const port = process.env.PORT || 8000;

connectDB()
.then(() => {
    app.on("error", (error) => {
        console.log("ERROR: ", error);
        process.exit(1);
    })
    app.listen(port, () => {
        console.log(`App running at port: ${port}`);
    })
})
.catch((error) => {
    console.log(`MONGODB connection failed !!! ${error}`);
})