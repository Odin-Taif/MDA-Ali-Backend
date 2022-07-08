


//  in the user js validation file, we validate out incoming data from the user. 

const { check, validationResult } = require('express-validator');




//==================  this is the create user validation. or in other word sign up validation. 
exports.validateUserSignUp =  [

    //check the name
    check('fullname')
    .trim()
    .not()
    .isEmpty()
    .withMessage('name is empty')
    .isString()
    .withMessage('must be a valid name')
    .isLength({min:3, max:20})
    .withMessage('Name must be within 3 to 20 character'), 

    // Check the email
    check('email')
    .normalizeEmail()
    .isEmail()
    .withMessage('Invalid Email'), 



    // check the password
    check('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage('password is empty')
    .isLength({min:8, max:20})
    .withMessage('Password must be 8 to 20 character long!'), 
    check('confirmPassword')
    .trim()
    .not()
    .isEmpty()
    .custom((value, {req}) => {
        if(value !== req.body.password){
            throw new Error('both password must be same!')
        }
        return true;
    })

]



// =======================second method to run after the validation of our coming object, from the user, to capture the error messages.

exports.userValidation = (req, res, next) => {
    const result = validationResult(req).array();
    // here we check if the result array of the req object we got and checked is the result.length is not there == !result.length
    if(!result.length) return next();
    const error = result[0].msg;
    res.json({success:false, message:error})
}



//========== sign validation===================
exports.validateUserSignIn = [
    check('email')
    .trim()
    .isEmail()
    .withMessage('email is required!'), 
    check('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage('password is required!')
]

