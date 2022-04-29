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
    creatorId: req.session.creatorId,
    imageUrl: req.body.imageUrl,
  })
  .then((newPost)=>{
    res.redirect("/users/user-home");
  })
  .catch((err)=>{
    console.log("error creating new post", err)
  });
  }
});

// GET FULL POST DETAILS PAGE 
router.get("/:id/post-details", isLoggedIn, (req, res, next)=>{
  Post.findById(req.params.id)
  .then((foundPost)=>{
    res.render("posts/post-details", {foundPost: foundPost})
  })
  .catch((err)=>{
    console.log("error making posts list", err)
    res.render("index", {message: err.message})
  });
})

//GET FULL POST DETAILS PAGE
router.get("/:id/update-post", isLoggedIn, (req, res, next)=>{
  Post.findById(req.params.id)
  .then((foundPost)=>{
    res.render("posts/update-post", {foundPost: foundPost})
  })
  .catch((err)=>{
    console.log("error making posts list", err)
    res.render("index", {message: err.message})
  })
});

//POST FULL POST DETAILS UPDATE PAGE
router.post("/:id/update-post", isLoggedIn, (req, res, next)=>{
  Post.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    content: req.body.content,
    imageUrl: req.body.imageUrl,
  })
  .then((foundPost)=>{
    res.redirect("/users/user-home")
  })
  .catch((err)=>{
    console.log("error making posts list", err)
    res.render("index", {message: err.message})
  })
});

//GET DELETE FULL POST PAGE
router.get("/:id/post-delete", (req, res, next)=> {
  Post.findByIdAndDelete(req.params.id)
  .then(()=>{
    res.redirect("/users/user-home")
  })
  .catch((err)=>{
    console.log("error making posts list", err)
    res.render("index", {message: err.message})
  })
})

//GET FULL POST DETAILS
// router.get("/:id/post-details", isLoggedIn, (req, res, next)=> {
//   res.render("posts/post-details");
// })

//GET POST DETAILS PAGE DELETE A TAG

//GET

//POST POST DETAILS PAGE EDIT FUNCTION



//POST POST DETAILS PAGE 

module.exports = router; 