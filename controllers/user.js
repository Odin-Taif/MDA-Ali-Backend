
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const sharp = require("sharp");




// this function when reques /create-user we run this.
exports.createUser = async (req, res) =>{
    const {fullname, email, password} = req.body
    const isNewUser = await User.isThisEmailInUse(email);
    if(!isNewUser)
    return res.json({
        success:false, 
        message:'this email is already in use, try sign-in',
});
//============ else we will create a user with creditials. 
 const user = await User({
        fullname, 
        email,
        password,
    });
    await user.save();
    res.json(user);
}





//=============== sigin method 
exports.userSignIn = async (req, res)=>{
            const {email, password} = req.body;
            const user = await User.findOne({email})
            if(!user) return res.json({success:false, message:'user not found with the given email'})
            const isMatch =  await user.comparePassword(password)
            if(!isMatch) return res.json({success:false, message:'email or password does not match'})
            //============================== this token 
            const token  = jwt.sign({userId:user._id}, process.env.JWT_SECRET, {expiresIn:'1d'})
            const userInfo = {
                fullname: user.fullname, 
                email:user.email, 
                avatar:user.avatar ? user.avatar  : '',
            }
            res.json({success:true, user:userInfo, token})
}



exports.uploadProfile =   async (req, res) => {
    //======== We destructure user from the requset ==============//
        const { user } = req;
        //we check if the user exists, if not we return the following
        if (!user)
          return res
            .status(401)
            .json({ sucess: false, message: "unauthoruzed access!" });
            console.log(req.file)
        try {
          const profileBuffer = req.file.buffer;
          const { width, height } = await sharp(profileBuffer).metadata();
          const avatar = await sharp(profileBuffer)
            .resize(Math.round(width * 0.5), Math.round(height * 0.5))
            .toBuffer();
          await User.findByIdAndUpdate(user._id, { avatar });
          res
            .status(201)
            .json({
              success: true,
              message: "Your profile picture has been updated",
            });
        } catch (error) {
          res
            .status(500)
            .json({ success: false, message: "server error, try again" });
          console.log("error while uploading an image", error.message);
        }
      }