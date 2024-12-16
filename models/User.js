const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'email requis.'],
        unique: true,
    
    },
    password: {
        type: String,
        required: [true, 'mot de passe requis.'],
        minlength: 6,
    },
    isVerified: {
        type:Boolean,
        default: false
    },
    verificationToken: {
        type: String
    },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10); 
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
