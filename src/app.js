import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";


const app = express();

// used for middlewares
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit:"16kb"}))

app.use(express.urlencoded({extended: true, limit: "16kb"}))

app.use(express.static("public"))

app.use(cookieParser())

import userRouters from './routes/user.routes.js'

app.use("/api/v1/users", userRouters);

export  {app}