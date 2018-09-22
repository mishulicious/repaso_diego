const router = require('express').Router()
const User = require('../models/User')
const passport = require('../helpers/passport')
const uploadCloud = require('../helpers/cloudinary')

const isLogged = (req, res, next)=>{
  if(req.isAuthenticated())return next()
    return res.redirect('/login')
}
//el get renderiza
router.get('/signup', (req, res)=>{
  config ={
    title: 'Sign up',
    btnvalue: 'Create Account',
    url: '/signup',
    password: true,
    id:""
  }
  res.render('auth/signup',config)
})

router.post('/signup', (req, res, next)=>{
  User.register(req.body, req.body.password)
  .then(user=>{
    res.redirect('/login')
  })
  .catch(e=>console.log(e))
})

router.get('/login', (req, res)=>{
  if(req.user)req.logOut()
  res.render('auth/login')
})

router.post('/login', passport.authenticate('local'), (req, res, next)=>{
  req.app.locals.loggedUser = req.user;
  res.redirect('/profile')
})

router.get('/profile', isLogged, (req, res)=>{
  User.findById(req.app.locals.loggedUser._id).populate('notitas')
  .then(usuario =>{
    console.log(usuario)
    res.render('profile', usuario)
  
  })
  
})

router.get('/edit/:id',isLogged, (req, res)=>{
  config = { 
    title:'Edit Profile',
    btnvalue: 'Save',
    url: '/edit',
    username: req.app.locals.loggedUser.username,
    email: req.app.locals.loggedUser.email,
    password: false,
    id: req.user._id
  }
  res.render('auth/signup', config)
})

router.post ('/edit/:id', (req, res, next)=>{
  let {id} = req.params
  User.findByIdAndUpdate(id, req.body, {new:true})
  .then(user=>{
    req.app.locals.loggedUser = user
    res.redirect('/profile')
  })
  .catch(e=> next(e))
})

router.get('/edit_image', isLogged, (req, res)=>{
  res.render('edit_image')
})

router.post('/edit_image',isLogged, uploadCloud.single('photoURL'), (req,res,next)=>{
  User.findByIdAndUpdate(req.app.locals.loggedUser._id, {photoURL:req.file.url}, {new:true})
  .then(user=>{
    req.app.locals.loggedUser = user
    res.redirect('/profile')
  })
  .catch(e=> next(e))
})


module.exports = router