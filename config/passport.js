const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: `${process.env.BASE_URL}/auth/facebook/callback`,
  profileFields: ['id', 'displayName', 'email']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const user = await User.findOne({ providerId: profile.id, provider: 'facebook' });
    if (user) {
      return done(null, user);
    }
    const newUser = new User({
      providerId: profile.id,
      provider: 'facebook',
      displayName: profile.displayName,
      email: profile.emails ? profile.emails[0].value
      : null
    });
    await newUser.save();
    done(null, newUser);
} catch (err) {
    done(err);
    }
}));
    
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.BASE_URL}/auth/google/callback`
    }, async (accessToken, refreshToken, profile, done) => {
    try {
    const user = await User.findOne({ providerId: profile.id, provider: 'google' });
    if (user) {
    return done(null, user);
    }
    const newUser = new User({
    providerId: profile.id,
    provider: 'google',
    displayName: profile.displayName,
    email: profile.emails ? profile.emails[0].value : null
    });
    await newUser.save();
    done(null, newUser);
    } catch (err) {
    done(err);
    }
    }));
    
    passport.serializeUser((user, done) => {
    done(null, user.id);
    });
    
    passport.deserializeUser(async (id, done) => {
    try {
    const user = await User.findById(id);
    done(null, user);
    } catch (err) {
    done(err);
    }
});