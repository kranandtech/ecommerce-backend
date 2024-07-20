const express = require('express');
const {signUP, Login} = require("../controller/authController.js");

const authRouter = express.Router();

authRouter.route("/signup").post(signUP);
authRouter.route("/login").post(Login);

module.exports = authRouter;