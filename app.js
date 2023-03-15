require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const authRoutes = require('./routes/auth');
const homeRoutes = require('./routes/home');
const { handleError } = require('./utils/errors');

const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Parse incoming form data
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error(err);
});

// Set up session middleware
const sessionStore = MongoStore.create({
  mongoUrl: process.env.DB_URL,
  collectionName: 'sessions',
  ttl: 60 * 60 * 24,
  autoRemove: 'native'
})

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: sessionStore
}));

// Set up Passport middleware
require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

// Set up routes
app.use('/auth', authRoutes);
app.use('/', homeRoutes);

// Handle errors
app.use((err, req, res, next) => {
  handleError(err, res);
});

//
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
