const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const passport = require('passport')
const mongoose = require('mongoose')
const LocalStrategy = require('passport-local').Strategy
const User = require('./models/user.model')

const main_route = require('./routes/main.route')
const beet_route = require('./routes/beet.route')

const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(require('express-session')({
    secret: 'Silicon Valley',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(main_route)
app.use('/beets', beet_route)

let db_url = "mongodb://localhost:27017/testdb"
mongoose.connect(db_url, {useNewUrlParser: true})
mongoose.Promise = global.Promise
let db = mongoose.connection
db.on('error', console.error.bind(console, 'Error connecting to MongoDB'))

let port = process.env.PORT || 8080

app.listen(port, '0.0.0.0', ()=>{
    console.log(`Beeter started on ${port}.`)
})