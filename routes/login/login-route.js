const passport = require('passport')
const router = require('express').Router()

const { requireNotAuth } = require('../../middleware/auth-check')

router.use(requireNotAuth)

router.use('/google', require('./google-router'))
router.use('/facebook', require('./facebook-router'))

router.route('/')
.get((req, res) => {
  return res.render('login')
})
.post(passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: true,
  successFlash:true
}),
(req, res) => {
  return res.redirect('/')
})

module.exports = router