const passport = require('passport')

const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const FacebookStrategy = require('passport-facebook').Strategy

const defUsers = [
  {
    id: 0,
    googleId: 'x',
    facebookId: 'x',
    name: 'x',
    password: 'x',
    email: 'x@x.x'
  }
]
const config = (users = defUsers, createUserId) => {

  passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  (email, password, done) => {
    const user = users.find(u => u.email === email && u.password === password)
    if (user == null) {
      return done(null, false, {message: 'username or password incorrect'})
    }
    return done(null, user, {message: 'you are in'})
  }))

  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/login/google/redirect'
  },
  (accessToken, refreshToken, profile, done) => {
    let user = users.find(u => u.googleId === profile.id)
    if (user == null) {
      user = {
        id: createUserId(),
        googleId: profile.id,
        name: profile.name.givenName
      }
      users.push(user)
    }
    return done(null, user)
  }))

  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: '/login/facebook/redirect'
  },
  (accessToken, refreshToken, profile, done) => {
    let user = users.find(u => u.googleId === profile.id)
    if (user == null) {
      user = {
        id: createUserId(),
        facebookId: profile.id,
        name: profile.displayName
      }
      users.push(user)
    }
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