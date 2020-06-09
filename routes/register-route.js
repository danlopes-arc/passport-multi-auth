const passport = require('passport')
const router = require('express').Router()


router.route('/')
.get((req, res) => {
  return res.render('register')
})
.post((req, res) => {
  const user = req.body
  console.log(user)
  if (!user || user.name === '' || user.email === ''|| user.password === '' ) {
    return res.redirect('/register')
  }
  if (req.users.find(u => u.email === user.email)) {
    return res.redirect('/register')
  }
  user.id = req.createUserId()
  req.users.push({...user})
  console.log('[passport local] new user', user)
  return res.redirect('/login')
})


module.exports = router