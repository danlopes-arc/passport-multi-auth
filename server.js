require('dotenv').config()
const express = require('express')
const passport = require('passport')
const session = require('express-session')
const passportConfig = require('./config/passport-config')

const handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')

const users = [
  {
    id: 0,
    googleId: 'x',
    name: 'x',
    password: 'x',
    email: 'x@x.x'
  }
]

passportConfig(users)

const app = express()

app.engine('handlebars', expressHandlebars({
  handlebars: allowInsecurePrototypeAccess(handlebars)
}))
app.set('view engine', 'handlebars')

app.use(express.static('./static'))
app.use(express.urlencoded({extended: false}))
app.use(session({
  secret: process.env.EXPRESS_SESSION_SECRET,
  saveUninitialized: true,
  resave: false
}))
app.use(passport.initialize())
app.use(passport.session())
// add user to res.locals
app.use((req, res, next) => {
  res.locals.user = req.user
  return next()
})
// add users to req
app.use((req, res, next) => {
  req.users = users
  return next()
})
// add createId to req
app.use((req, res, next) => {
  req.createUserId = () => {
    const id = Math.floor(Math.random() * 1000000)
    if (users.find(u => u.id === id) == null) {
      return id
    }
    return createId()
  }
  return next()
})

app.use('/login', require('./routes/login-route'))
app.use('/register', require('./routes/register-route'))

app.get('/', (req, res) => {
  return res.render('index')
})

app.get('/logout', (req, res) => {
  req.logOut()
  return res.redirect('/')
})

const port = process.env.PORT | 3000
app.listen(port, () => {
  console.log(`[server] listening to http://localhost:${port}`)
})