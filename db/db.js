const mongoose = require('mongoose');

module.exports.connectToMongoDB = async () => {
    mongoose.set('strictQuery', false); // Option pour contrôler le comportement des requêtes

    const dbUrl = process.env.MONGO_URI;

    try {
        await mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connexion réussie à MongoDB.');
    } catch (error) {
        console.error('Echec de connexion à MongoDB :', error.message);
        throw error; // Lancer l'erreur pour être gérée dans app.js
    }
};
