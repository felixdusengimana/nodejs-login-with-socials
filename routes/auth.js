const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

router.get('/facebook', authController.loginFacebook);
router.get('/facebook/callback', authController.loginFacebookCallback);
router.get('/google', authController.loginGoogle);
router.get('/google/callback', authController.loginGoogleCallback);
router.get('/logout', authController.logout);

module.exports = router;
