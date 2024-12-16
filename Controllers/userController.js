const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const { sendVerificationEmail } = require('../utils/emailService');
const { generateToken, verifyToken } = require('../utils/tokenService');

// Inscription
module.exports.SignUp = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email et mot de passe requis.' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email déjà pris.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const verificationToken = generateToken({ email }, '1d');

        const user = new User({
            email,
            password: hashedPassword,
            isVerified: false,
            verificationToken,
        });
        const addedUser = await user.save();

        // Construct the correct verification link
        const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;


        await sendVerificationEmail(email, verificationLink);

        res.status(201).json({ message: 'Utilisateur créé avec succès. Veuillez vérifier votre email.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de l\'inscription.', error });
    }
};

// Vérification de l'email
module.exports.verifyEmail = async (req, res) => {
    const { token } = req.query;

    if (!token) {
        return res.status(400).json({ message: 'Token manquant.' });
    }

    try {
        const decoded = verifyToken(token);
        const user = await User.findOne({ email: decoded.email, verificationToken: token });

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé ou token invalide.' });
        }

        user.isVerified = true;
        user.verificationToken = null;
        await user.save();

        res.status(200).json({ message: 'Email vérifié avec succès, vous pouvez maintenant vous connecter.' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Token invalide ou expiré.', error });
    }
};

// Connexion
module.exports.Signin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email et mot de passe requis.' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur introuvable.' });
        }

        if (!user.isVerified) {
            return res.status(400).json({ message: 'Veuillez vérifier votre email avant de vous connecter.' });
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Mot de passe incorrect.' });
        }

        const token = generateToken({ id: user._id }, '1h');
        res.json({ message: 'Connexion réussie.', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la connexion.', error });
    }
};

// Endpoint protégé
module.exports.endpoint = (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Accès non autorisé.' });
    }

    try {
        const decoded = verifyToken(token);
        res.status(200).json({ message: 'Accès autorisé.', user: decoded });
    } catch (error) {
        console.error(error);
        res.status(403).json({ message: 'Token invalide ou expiré.', error });
    }
};
