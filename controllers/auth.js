const passport = require('passport');

exports.loginFacebook = passport.authenticate('facebook', { scope: ['email'] });

exports.loginFacebookCallback = passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/login'
});

exports.loginGoogle = passport.authenticate('google', { scope: ['profile', 'email'] });

exports.loginGoogleCallback = passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/login'
});

exports.logout = (req, res) => {
  req.session.destroy(function(err) {
    if (err) {
      console.log(err);
    }
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
}
