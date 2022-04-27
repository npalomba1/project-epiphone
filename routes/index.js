var express = require('express');
var router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Fretlog' });
});




//FIGURE OUT HOW TO MAKE A BUTTON THAT TRIGGERS THE API SEARCH FOR THE CHORD 
//POST 




module.exports = router;
