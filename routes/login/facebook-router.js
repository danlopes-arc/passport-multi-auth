const passport = require('passport')
const router = require('express').Router()

router.get('/', passport.authenticate('facebook'))

router.get('/redirect', passport.authenticate('facebook'),
(req, res) => {
  req.flash('success', 'you are in')
  return res.redirect('/')
})

module.exports = router