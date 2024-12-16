const jwt = require('jsonwebtoken');

// Générer un token
module.exports.generateToken = (payload, expiresIn = '1d') => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

// Vérifier un token
module.exports.verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        console.error('Erreur lors de la vérification du token:', error);
        throw error;
    }
};
