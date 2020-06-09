const passport = require('passport')

const LocalStrategy = require('passport-local').Strategy

const defUsers = [
  {
    id: 0,
    googleId: 'x',
    name: 'x',
    password: 'x',
    email: 'x@x.x'
  }
]

const config = (users = defUsers) => {

  passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  (email, password, done) => {
    const user = users.find(u => u.email === email && u.password === password)
    return done(null, user)
  }))


  passport.serializeUser((user, done) => {
    return done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    const user = users.find(u => u.id === id)
    return done(null, user)
  })
}

module.exports = config