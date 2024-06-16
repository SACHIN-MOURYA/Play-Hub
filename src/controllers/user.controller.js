
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser = asyncHandler(async (req, res) => {
  // get user detail
  // posibile validation
  // check if user is already exist by using email and username
  // check for image and avatart
  // upload them to cloudnnary, avtar
  // create user object - create entry in db
  // remove passwords and refresh token from response
  // check user creation
  // return res


    const  {fullName, email, username, password}= req.body
    console.log(email);

    if(
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400, "data is missing");
    }

    const existUser =await User.findOne({$or: [{username}, {email}]})
    

    if(existUser){
        throw new ApiError(400, "user already exists");
    }
   
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, "avatar is needed")
    }


    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)


    if(!avatar){
        throw new ApiError(400, "avatar is needed")
    }


    const  user = await  User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findOne(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "server error while registering user")
    }


    return  res.status(201).json(
        new ApiResponse(200,createdUser, "user Registerded succesfully")
    )

})


export {registerUser}