const requireAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/login')
  }
  return next()
}

const requireNotAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  return next()
}

module.exports = {
  requireAuth,
  requireNotAuth
}