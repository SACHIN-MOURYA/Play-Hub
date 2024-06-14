import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: CLOUDINARY_API_SECRET
});

const uploadONClodinary = async (localFilePath) => {
      try{
        if(!localFilePath) return null;
        const res = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto"
        })
        console.log("file uploded ", res.url);
        return res;
      } catch(error){
        fs.unlinkSync(localFilePath)
        return null;
      }    
}

export {uploadONClodinary};