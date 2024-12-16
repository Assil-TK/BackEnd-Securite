const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

// Routes utilisateur
// Inscription
router.post('/signup', userController.SignUp);

// Vérification de l'email après inscription
router.get('/verify-email', userController.verifyEmail);

// Connexion
router.post('/signin', userController.Signin);

// Route protégée pour tester le token
router.get('/protected', userController.endpoint);

module.exports = router;
