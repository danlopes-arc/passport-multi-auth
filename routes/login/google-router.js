const passport = require('passport')
const router = require('express').Router()

router.get('/', passport.authenticate('google', {
  scope: ['profile']
}))

router.get('/redirect', passport.authenticate('google'),
(req, res) => {
  req.flash('success', 'you are in')
  return res.redirect('/')
})

module.exports = router