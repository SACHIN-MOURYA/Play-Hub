import mongoose, { connect }  from "mongoose";
import { DB_NAME } from "../constants.js";
const connectDB = async () => {
    try{
      const connectionInstance =  await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
      console.log(`\n MongoDB connected !! DB Host: ${connectionInstance.connection.host}`);
      // get knowledge frm printing instance of mongodb
    } catch(error){
        console.error("mongodb Error:", error);
        process.exit(1)
    }

}

export default connectDB