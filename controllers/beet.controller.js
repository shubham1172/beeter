const Beet = require('../models/beet.model')

exports.create_beet = (req, res) => {
    if (!req.body.content) {
        res.redirect("/?error=Missing content.")
    } else {
        var beet = new Beet({
            author: req.user,
            content: req.body.content,
        })
        console.log(beet)
        beet.save((err, new_beet) => {
            if (err) {
                console.log(err)
                res.redirect("/?error=" + err.message)
            } else {
                res.redirect("/")
            }
        })
    }
}

exports.get_beet = (req, res) => {
    Beet.findById(req.params.id, (err, beet) => {
        if (err) res.status(500).send({"message": err.message})
        else if (beet) {
            res.status(200).send(beet)
        }
        else {
            res.status(200).send(beet)
        }
    })
}

exports.get_beets_func = function(callback) {
    Beet.find({}, function(err, beets){
        beets.reverse()
        if (err) callback({"status": 500, "data": err.message})
        else callback({"status": 200, "data": beets})
    })
}

exports.get_beets = (req, res) => {
    this.get_beets_func(function(data){
        console.log(data)
        res.status(data["status"]).send(data["data"])
    });
}

exports.update_beet = (req, res) => {

}

exports.delete_beet = (req, res) => {

}

exports.like = (req, res) => {
    Beet.findOne({_id: req.params.id, likes: req.user}, function(err, beet){
        if (err) res.redirect('/')
        else if (!beet) {
            // possibly id not found or like does not exist
            Beet.findById(req.params.id, function(err, new_beet){
                if (err) res.redirect('/')
                new_beet.likes.push(req.user)
                new_beet.save((err, new_new_beet) => {
                    res.redirect('/')
                })
            })
        }
        else {
            // like does exist
            beet.likes = beet.likes.filter(function(element, i){
                return element.username != req.user.username
            })
            beet.save((err, new_beet) => {
                res.redirect('/')
            })
        }
    })
}

  /** 
            {
                // remove it
                console.log("removing")
                beet.likes = beet.likes.filter(function(element, i) {
                    return element != req.user
                });
            } else {
                console.log("adding")
                // beet.likes.push(req.user)
            }
            beet.save((err, new_beet)=> {
                res.redirect('/')
            })*/