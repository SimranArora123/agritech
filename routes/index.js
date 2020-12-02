const route = require('express').Router()
const User = require('../models/user')
const CompanyUser = require('../models/companyuser')
const passport = require('passport')
const LocalStrategy = require('passport-local')
route.get('/register', (req, res) => {
    res.render('register')
})

route.post('/register', (req, res) => {
    User.register(new User({
        username: req.body.email,   
        id :req.body.id
    }), req.body.password, (err, user) => {
        if (err) {
            console.log(err)
            return res.render('register')
        } else {
            User.authenticate('local')(req, res, () => res.redirect('/'))
        }

    })
})

route.get('/companyregister',(req,res)=>{
    res.render('companyregister')
})

route.post('/companyregister', (req, res) => {

    CompanyUser.register(new CompanyUser({
        username: req.body.email,
        Cid: req.body.Cid
    }), req.body.password, (err, user) => {
        if (err) {
            console.log(err)
            return res.render('companyregister')
        } else {
            CompanyUser.authenticate('local')(req, res, () => res.redirect('/'))
        }

    })
})

route.get('/login', (req, res) => {
    res.render('login')
})
route.post('/login', passport.authenticate('bloglocal', {
    successRedirect: '/',
    failureRedirect: '/login'
}), (req, res) => {console.log(req.body.id + req.body.email +req.body.password)})

route.get('/companylogin', (req, res) => {
    res.render('companylogin')
})

route.post('/companylogin', passport.authenticate('companylocal', {
    successRedirect: '/company',
    failureRedirect: '/companylogin'
}), (req, res) => {
    console.log(req.body.id + req.body.email + req.body.password)
})


route.get('/logout', (req, res) => {
    req.logOut()
    res.redirect('/')
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next()
    res.redirect('/login')
}

module.exports = route