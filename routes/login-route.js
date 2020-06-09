const passport = require('passport')
const router = require('express').Router()


router.route('/')
.get((req, res) => {
  return res.render('login')
})
.post(passport.authenticate('local', { failureRedirect: '/login' }),
(req, res) => {
  console.log('[passport local] old user', req.user)
  return res.redirect('/')
})

// router.get('/google', passport.authenticate('google', {
//   scope: ['profile']
// }))

// router.get('/google/redirect', passport.authenticate('google'),
// (req, res) => {
//   return res.redirect('/')
// })

module.exports = router