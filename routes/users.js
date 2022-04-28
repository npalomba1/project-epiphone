var express = require('express');
var router = express.Router();

const User = require("../models/User.model"); 
const Post = require("../models/Post.model"); 
const bcrypt = require("bcryptjs"); 
const saltRounds = 10; 
const isLoggedIn = require("../middleware/isLoggedIn")
const axios = require('axios'); 

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
        fullName: req.body.fullName,
      })
      .then((createdUser)=> {
        // res.redirect('users/user-home')
        res.redirect('/posts/users/user-home')
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

//GET USERS PROFILE HOME PAGE
router.get("/user-home", isLoggedIn, (req, res, next)=> {
    res.render("/posts/users/user-home", {user: req.session.user});
})

//GET ALL POSTS LISTS TO SHOW UP ON USERS PROFILE HOME PAGE


// //POST USER PROFILE HOME PAGE
// router.post("/user-home", (req, res, next)=>{
//   res.render("users/user-home");
// })

//GET LOGIN 
router.get("/login", (req, res, next) => {
  res.render("users/login"); 
}); 

//PUSH LOGIN
router.post("/login", (req, res, next)=> {
  //1.) check if fields are empty
  if (!req.body.username || !req.body.password) {
    res.render("users/user-home", {message: "Username and password required to log in"})
  }
  //2.) make sure the user exists
  User.findOne({username: req.body.username})
  .then((foundUser)=> {
    if(foundUser){
      //3.)check password
      //this will return true or false
      const doesMatch = bcrypt.compareSync(req.body.password, foundUser.password)
      if(doesMatch) {
        //4.) set up a session
        req.session.user = foundUser; 
        // res.render('users/user-home', { name: req.session.user.username })
        res.redirect('posts/users/user-home')

      } else {
        res.render('login', {message: "Username or password is incorrect"})
      }
    }
  })
  .catch((err)=> {
    console.log("failed", err.message)
  })
})

// GET DIAGRAM FINDER PAGE
// router.get("/diagram-finder", isLoggedIn, (req, res, next) => {
//   axios
//     .get("https://api.uberchord.com/v1/embed/chords?nameLike=F#")
//     // .get("https://www.scales-chords.com/api/scales-chords-api.js")
//     .then((results)=>{
//       res.render("users/diagram-finder")
//       // res.render("users/diagram-finder" )  {chord: results.data}^^
//     })
//     .catch((err)=>{
//       res.json(err.message);
//     });
// }); 
router.get("/diagram-finder", isLoggedIn, (req, res, next) => {
  console.log(req.query.chord)
  axios
    .get("https://api.uberchord.com/v1/embed/chords?nameLike=F")
    // .get("https://www.scales-chords.com/api/scales-chords-api.js")
    .then((results)=>{
      res.render("users/diagram-finder", {chord: req.query.chord})
      // res.render("users/diagram-finder" )  {chord: results.data}^^
    })
    .catch((err)=>{
      res.json(err.message);
    });
}); 

//POST DIAGRAM FINDER PAGE
// router.post("/diagram-finder/search")

// //GET DIAGRAM FINDER PAGE backup just in case lol
// router.get("/diagram-finder", isLoggedIn, (req, res, next) => {
//   axios
//   .get("https://www.scales-chords.com/api/scales-chords-api.js")
//   .then((results)=>{
//     // res.render("users/diagram-finder", {chord: JSON.stringify(results.data)})
//     res.render("users/diagram-finder")
//   })
//   .catch((err)=>{
//     res.json(err.message); 
//   });
// }); 

//POST DIAGRAM FINDER PAGE 



//GET LOGOUT PAGE
router.get("/logout", (req, res, next) => {
  req.session.destroy(); 
  res.render("index", {message: "You have successfully logged out"})
})

//POST DELETE USER ACCT 
router.get("/user-home/:userId/delete-user", (req, res, next) => {
  User.findByIdAndDelete(req.params.userId)
  .then(()=> {
    res.render('index')
  })
  .catch((err)=>{
    console.log("failed", err.message)
  });
});

module.exports = router;
