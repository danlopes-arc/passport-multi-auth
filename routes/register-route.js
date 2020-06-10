const passport = require('passport')
const router = require('express').Router()

const { requireNotAuth } = require('../middleware/auth-check')

router.use(requireNotAuth)

router.route('/')
.get((req, res) => {
  return res.render('register')
})
.post((req, res) => {
  const user = req.body
  if (!user || user.name === '' || user.email === ''|| user.password === '' ) {
    req.flash('error', 'you must fill all the fields')
    return res.redirect('/register')
  }
  if (req.users.find(u => u.email === user.email)) {
    req.flash('error', 'email is already registered')
    return res.redirect('/register')
  }
  user.id = req.createUserId()
  req.users.push({...user})
  req.flash('success', 'successfully registered, you can login now')
  return res.redirect('/login')
})

module.exports = router