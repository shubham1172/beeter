const passport = require('passport')
const beet_controller = require('./beet.controller')
const User = require('../models/user.model')

exports.index = (req, res) => {
    beet_controller.get_beets_func(function(beets){
        if (beets.status == 200)
            res.render('../views/home', {user: req.user, beets: beets["data"], error: req.params.error})
        else
            res.render('../views/home/', {user: req.user, beets: null, error: beets["data"]})
    })
}

exports.login = (req, res) => {
    if (req.user)
        res.status(403).send({"message": "Already logged in. Logout to continue."})
    else
        passport.authenticate('local')(req, res, function(){
            res.redirect('/')
        })
}

exports.login_page = (req, res) => {
    res.render('../views/login', {error: req.query.error})
}

exports.signup = (req, res) => {
    if (req.user) 
        res.status(403).send({"message": "Cannot sign up. Logout to continue."})
    else {
        var user = new User({username: req.body.username, name: req.body.name})

        User.register(user, req.body.password, function (err, user) {
                if (err) {
                    console.log("Error registering user", err)
                    res.redirect('/signup?error='+err.message)
                } else {
                    console.log(`Registered user - ${user.username}.`)
                    passport.authenticate('local')(req, res, function(){
                        console.log('Done')
                        res.redirect('/')
                    })
                }      
        })
    }

}

exports.signup_page = (req, res) => {
    res.render('../views/signup', {error: req.query.error})
}

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/')
}