var express = require('express');
var router = express.Router();

const User = require("../models/User.model")
const Post = require("../models/Post.model")
const bcrypt = require("bcryptjs"); 
const saltRounds = 10; 
const isLoggedIn = require("../middleware/isLoggedIn")
const axios = require('axios'); 

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//GET CREATE NEW POST PAGE
router.get("/create-post", isLoggedIn, (req, res, next) => {
    res.render("posts/create-post"); 
}); 

//POST CREATE NEW POST PAGE

//GET POST DETAILS PAGE 

//GET POST DETAILS PAGE DELETE A TAG

//GET

//POST POST DETAILS PAGE EDIT FUNCTION



//POST POST DETAILS PAGE 

module.exports = router; 