const User = require("../models/user.model")
const Beet = require("../models/beet.model")

exports.get_profile = (req, res) => {
    if (req.params.username) {
        User.findOne({username: req.params.username}, (err, user) => {
            if (err) res.redirect("/?error="+err.message)
            else {
                Beet.find({author: user}, function(err, beets){
                    if (err) res.redirect("/?error="+err.message)
                    res.render("../views/profile", {user: req.user, profile: user, beets: beets})
                })
            }
        })
    } 
    else res.redirect("/")
}

exports.update_profile = (req, res) => {

}

