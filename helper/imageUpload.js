
// here we configure our cloudinary storage.... 

const  cloudinary = require('cloudinary').v2;
CLOUDINARY_USER_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET 
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_USER_NAME,
    api_key:process.env.CLOUDINARY_API_KEY, 
    api_secret:process.env.CLOUDINARY_API_SECRET, 
})

module.exports = cloudinary;