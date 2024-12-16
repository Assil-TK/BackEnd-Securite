const nodemailer = require('nodemailer');

// Configurer le transporteur pour Gmail SMTP
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',  // Serveur SMTP de Gmail
    port: 465,               // Port pour SSL (utilise 465 ou 587 pour TLS)
    secure: true,            // true pour SSL (port 465), false pour TLS (port 587)
    auth: {
        user: 'tekayaassil2@gmail.com',  // Ton adresse email d'expéditeur
        pass: 'ybli butl rmyk ialc',            // Le mot de passe spécifique à l'application que tu as généré
    },
});

// Fonction pour envoyer un email de vérification
module.exports.sendVerificationEmail = async (email, verificationLink) => {
    try {
        // Envoi de l'email
        await transporter.sendMail({
            from: 'tekayaassil2@gmail.com',   // Adresse de l'expéditeur (même que dans 'auth.user')
            to: email,                 // Adresse du destinataire
            subject: 'Vérification de votre compte',  // Sujet de l'email
            text: `Cliquez sur ce lien pour vérifier votre compte : ${verificationLink}`,  // Texte brut
            html: `<p>Bienvenue ! Cliquez sur ce lien pour vérifier votre compte : <a href="${verificationLink}">${verificationLink}</a></p>`,  // Version HTML
        });
        console.log(`Email envoyé à ${email}`);
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email :', error);
        throw error;
    }
};
