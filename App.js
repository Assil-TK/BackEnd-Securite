const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const { connectToMongoDB } = require('./db/db');
const userRouter = require('./routes/userRouter');

dotenv.config(); // Charger les variables d'environnement depuis le fichier .env

// Vérifier que les variables d'environnement nécessaires sont définies
if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
    console.error('Erreur : Les variables MONGO_URI ou JWT_SECRET ne sont pas définies.');
    process.exit(1); // Quitter si des variables essentielles sont manquantes
}

// Initialiser l'application Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Gérer les politiques de CORS
app.use(helmet()); // Sécuriser les en-têtes HTTP
app.use(express.json()); // Analyser le JSON dans les requêtes

// Routes
app.use('/users', userRouter);

// Gestion des erreurs globales
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
});

// Fonction pour démarrer le serveur après la connexion à MongoDB
const startServer = async () => {
    try {
        await connectToMongoDB(); // Attendre que la connexion soit réussie
        app.listen(PORT, () => {
            console.log(`Serveur démarré sur http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Erreur lors de la connexion à MongoDB :', error.message);
        process.exit(1); // Quitter si la connexion échoue
    }
};

// Démarrer le serveur
startServer();

module.exports = app;
