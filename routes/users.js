var express = require('express');
var router = express.Router();

const User = require("../models/User.model")
const bcrypt = require("bcryptjs"); 
const saltRounds = 10; 

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//GET SIGNUP
router.get("/signup", (req, res, next) => {
  res.render("users/signup"); 
}); 
//POST SIGNUP 
router.post("/signup", (req, res, next) => {
  //1. ensure all fields are filled out
  if (!req.body.fullName || !req.body.username || !req.body.password) {
    res.render("users/signup", {message: "Name, username, and password required to sign up"})
  }
  //2. make sure username is not taken
  User.findOne({username: req.body.username})
  .then((foundUsername)=>{
    if(foundUsername) {
      //this means that the username exists in the system
      res.render('users/signup', {message: "Username is already taken"})
    } else {
      // 3. hash the password 
      const salt = bcrypt.genSaltSync(saltRounds)
      console.log("SALT", salt);

      const hashedPass = bcrypt.hashSync(req.body.password, salt)
      console.log("hashedPass", hashedPass)
      //4. Create the User
      User.create({
        username: req.body.username,
        password: hashedPass,
      })
      .then((createdUser)=> {
        res.render('index')
      })
      .catch((err)=>{
        console.log("Error creating user", err.message)
      });
    }
  })
  .catch((err)=>{
    console.log("Failure checking for user", err.message)
  });
})

//GET LOGIN 
router.get("/login", (req, res, next) => {
  res.render("users/login"); 
}); 

//PUSH LOGIN
router.post("/login", (req, res, next)=> {
  //1.) check if fields are empty
  if (!req.body.username || !req.body.password) {
    res.render("index", {message: "Username and password required to log in"})
  }
  //2.) make sure the user exists
  User.findOne({username: req.body.username})
  .then((foundUsername)=> {
    if(foundUsername){
      //3.)check password
      //this will return true or false
      const doesMatch = bcrypt.compareSync(req.body.password, foundUser.password)
      if(doesMatch) {
        //4.) set up a session
        req.session.username = foundUsername; 
        res.render('users/user-home', {info: JSON.stringify(req.session) })

      } else {
        res.render('login', {message: "Username or password is incorrect"})
      }
    }
  })
  .catch((err)=> {
    console.log("failed", err.message)
  })
})

//GET USERS PROFILE HOME PAGE

//GET DIAGRAM FINDER PAGE
//FIGURE OUT HOW TO MAKE A BUTTON THAT TRIGGERS THE API SEARCH FOR THE CHORD 
//POST 

//GET LOGOUT PAGE


module.exports = router;
