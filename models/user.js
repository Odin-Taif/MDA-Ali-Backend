// here we create our schecma from mongoose. is like blueprint.
const mongoose = require("mongoose");

// this bcrypt is user to hash the password.
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
  avatar: Buffer,
});

// so here before saving data we want to run a fucntion that hashs the value of it.
userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt.hash(this.password, 8, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    });
  }
});

// here we are comparing the passwords.
// we are getting the comparpassword from the methods object of the class userSchema.

userSchema.methods.comparePassword = async function (password) {
  if (!password) throw new Error("password is missing, can not compare!");
  try {
    const result = await bcrypt.compare(password, this.password);
    return result;
  } catch (error) {
    console.log("Error while comparing password", error.message);
  }
};

// userSchema.statics.isThisEmailInUse = async function(email){
//     if(!email) throw new Error('Invalid Email')
//     try {
//         const user  = await this.findOne({email})
//         if(user) return false
//         return true;
//     } catch (error) {
//          console.log('error inside isThisEmailInUse', error.message)
//          return false;
//     }

// }

userSchema.statics.isThisEmailInUse = async function (email) {
  if (!email) throw new Error("Invalid Email");
  try {
    const user = await this.findOne({ email });
    if (user) return false;
    return true;
  } catch (error) {
    console.log("error inside isThisEmailInUse method", error.message);
    return false;
  }
};

module.exports = mongoose.model("User", userSchema);
