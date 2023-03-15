const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('home', { user: req.user });
});

router.get('/login', (req, res) => {
  res.render('login', { user: req.user });
});

module.exports = router;
