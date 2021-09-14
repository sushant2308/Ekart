const router =require('express').Router();
const User = require('../models/User');
const bcrypt = require("bcryptjs");
const { registerValidation, loginValidation } = require("../validation/auth_validation");
const jwt = require("jsonwebtoken");
const verify = require("./verifyToken");



// @route POST /home
// @desc Register user
// @access Authenticated user
router.get("/home", verify, (req, res) => {
   res.status(200).send({message:"You are Authencticated"});
});


// @route POST /register
// @desc Register user
// @access Public
router.post("/register", async (req, res) => {

    //Lets Validate the data before making a user
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    //Checking to see if the email already exists in Database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(401).json({message: 'The email address you have entered is already associated with another account.'});
  
    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    });
    newUser.save()
    .then(user => res.status(200).json({message:"Successfully Registered"}))
    .catch(err => res.status(500).json({message:err.message}));
  });

// @route POST /login
// @desc Login user and return JWT token
// @access Public
  router.post("/login", async (req, res) => {

    //Lets Validate the data before making a user
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Checking to see if the email already exists in Database
    const user = await User.findOne({ email: req.body.email });
    if (!user) return  res.status(401).json({msg: 'The email address ' + req.body.email + ' is not associated with any account. Double-check your email address and try again.'});
    
    //Is the Password correct?
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(401).json({message: 'Invalid email or password'});
  
    //Create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header("auth-token", token).send({username:user.username,email:user.email,id:user._id,auth_token:token});
  });

module.exports = router;