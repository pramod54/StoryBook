const express = require('express');
const router = express.Router()
const {ensureAuth, ensureGuest} =  require('../middleware/auth');

//@ login/landing page
//get /
router.get('/',ensureGuest,(req,res) => {
    res.render('login',{
        layout: 'login',
    })
})

//@ dashboard
//get /dashboard
router.get('/dashboard',ensureAuth,(req,res) => {
    res.send('dashboard')
})


module.exports = router