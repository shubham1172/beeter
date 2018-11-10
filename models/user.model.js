var mongoose = require('mongoose')
var Schema = mongoose.Schema
var passportLocalMongoose = require('passport-local-mongoose')

var UserSchema = new Schema({
    username: String,
    name: {type: String, required: true, maxlength: 100},
    password: String,
})

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', UserSchema)