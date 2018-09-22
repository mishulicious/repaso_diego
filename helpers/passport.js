const passport =require('passport')
const User = require('../models/User')

//1.
passport.use(User.createStrategy())

//2.
passport.serializeUser((user, cb)=>{
  cb(null, user)
})

//3.
passport.deserializeUser((user, cb)=>{
  cb(null, user)
})

module.exports = passport