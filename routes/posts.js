var express = require('express');
var router = express.Router();

const User = require("../models/User.model")
const Post = require("../models/Post.model")
const bcrypt = require("bcryptjs"); 
const saltRounds = 10; 
const isLoggedIn = require("../middleware/isLoggedIn")
const axios = require('axios'); 

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

//GET CREATE NEW POST PAGE
router.get("/create-post", isLoggedIn, (req, res, next) => {
    res.render("posts/create-post"); 
}); 

//POST CREATE NEW POST PAGE
router.post("/create-post", isLoggedIn, (req, res, next) => {
  //1. make sure fields are filled out 
  if (!req.body.title || !req.body.content) {
    res.render('index', {message: "Title and content required"})
  } else {
     //2. Create the Post(s)
  Post.create({
    title: req.body.title,
    content: req.body.content,
    owner: req.session.user._id,
    // imageUrl: req.body.imageUrl,
  })
  .then((newPost)=>{
    res.render("posts/users/user-home");
  })
  .catch((err)=>{
    console.log("error creating new post", err)
  });
  }
});

//GET POST DETAILS PAGE (find Posts!)
router.get("/users/user-home", isLoggedIn, (req, res, next)=>{
  Post.find()
  .then((allPosts)=>{
    res.render("posts/users/user-home", {allPosts: allPosts})
  })
  .catch((err)=>{
    console.log("error making posts list", err)
  });
})

//GET POST DETAILS PAGE DELETE A TAG

//GET

//POST POST DETAILS PAGE EDIT FUNCTION



//POST POST DETAILS PAGE 

module.exports = router; 