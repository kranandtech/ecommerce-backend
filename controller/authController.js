const User = require('../model/userModel');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const  existingUser = async(email)=>{
  const user = await User.findOne({ email });
  return user;  
}
const verifyPassword = async(plainPassword,hashedPassword)=>{
  const isMatch = await bcrypt.compare(plainPassword,hashedPassword);
  console.log(hashedPassword);
  return isMatch;
}
const generateJWTToken = (user)=>{
  const token = jwt.sign(
    {
    exp:120, // seconds
    data:{
      userId: user._id,
      email: user.email,
      name: user.name,
    },
    },
    process.env.JWT_SECRET_KEY,
  );
  return token;
}
const signUP = async (req, res) => {

  try {
    const { email, password, name } = req.body;

    if(!email || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide email and password',
      });
    }
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!EMAIL_REGEX.test(email)){
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid email',
      });

    }
    const userFound = await existingUser(email);

    if (userFound) {
      return res.status(400).json({
        status: 'fail',
        message: 'User already exists',
      });
    }

    // Create a new user if email doesn't exist
    const hashedPassword = await bcrypt.hash(password, 10);
   
    const newUser = await User.create({ email, password:hashedPassword, name });
    res.status(201);
    return res.json({
      status: 'success',
      message: 'User created',
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

const Login = async(req,res) =>{
  try {
     const { email, password } = req.body;
     if(!email || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide email and password',
      });
    }
    
     const userFound = await existingUser(email);
     if(!userFound){
        res.status(400);
        return res.json({
          status:'fail',
          message: 'User not found',
        })
     }
     const hashedPassword = userFound.password;
     const isPasswordCorrect = await verifyPassword(password, hashedPassword);
     if(!isPasswordCorrect){
       res.status(400);
       return res.json({
         status:'fail',
         message: 'Incorrect password',
       });
      
     }
     res.status(200).json({
      status: 'success',
      message: 'User logged in',
      data: {
        user:{
          name: userFound.name,
          email: userFound.email,
        },
        token: generateJWTToken(userFound),
      },
     });
     
  } catch (error) {
    res.status(500);
    return res.json({
      status:'fail',
      message: error.message,
    })
  }
}
module.exports = { signUP,Login };
