const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const User = require("../models/user");

const router = express.Router();

//=============importing user controllers(methods) (userSignup and userSignin)==================//
const {
  createUser,
  userSignIn,
  uploadProfile,
} = require("../controllers/user");

const {
  validateUserSignUp,
  validateUserSignIn,
  userValidation,
} = require("../middlewares/validation/user");

const { isAuth } = require("../middlewares/auth.js");

// this method checks if the file is an image file.
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("invalid image file", false);
  }
};
// this we crreate a storge for our upload.
const storage = multer.diskStorage({});

const uploads = multer({ storage, fileFilter });

//=========================================creating a user route.
router.post("/create-user", validateUserSignUp, userValidation, createUser);

//=========================================Sign in route.
router.post("/sign-in", validateUserSignIn, userValidation, userSignIn);

//===========================================Creating a post  route.
router.post("/create-post", isAuth, (req, res) => {
  res.send("Welcome you are in my secret my area");
});
//==========================================Uploading an image route.
router.post(
  "/upload-profile",
  isAuth,
  uploads.single("profile"),
  uploadProfile
);
//====================== We export it to use it in other files===================//
module.exports = router;
