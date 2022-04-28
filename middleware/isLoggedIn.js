const isLoggedIn = (req, res, next) => {
    if(req.session.user) {
        next(); 
    } else {
        res.render("index", {message: "You must be logged in to access this page"})
    }
}

module.exports = isLoggedIn; 