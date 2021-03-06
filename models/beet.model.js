var mongoose = require('mongoose')
var User = require('./user.model')

var Schema = mongoose.Schema
var passportLocalMongoose = require('passport-local-mongoose')

var BeetSchema = new Schema({
    author: User.schema,
    timestamp: {type: Date, default: Date.now},
    content: {type: String, required: true, maxlength: 200},
    likes: [User.schema]
})

BeetSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('Beet', BeetSchema)