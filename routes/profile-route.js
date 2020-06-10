const passport = require('passport')
const router = require('express').Router()

const { requireAuth } = require('../middleware/auth-check')

router.use(requireAuth)

router.route('/')
.get((req, res) => {
  let userType = 'local'
  if (req.user.googleId != null) {
    userType = 'google'
  } else if (req.user.facebookId != null) {
    userType = 'facebook'
  }
  return res.render('profile', {userType})
})

module.exports = router