const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Utilisé pour hasher les mots de passe

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        match: /.+\@.+\..+/ // Vérifie le format de l'email
    },
    password: { 
        type: String, 
        required: true 
    },
    roles: { 
        type: [String], 
        default: ["user"] 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    // Informations de livraison
    shippingAddress: {
        street: { type: String, required: true },         // Rue et numéro
        city: { type: String, required: true },           // Ville
        postalCode: { type: String, required: true },     // Code postal
        country: { type: String, required: true, default: "France" }, // Pays
        phone: { type: String, required: true }           // Numéro de téléphone
    }
});

// Middleware Mongoose pour hasher le mot de passe avant de le sauvegarder
userSchema.pre('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

// Méthode pour comparer le mot de passe lors de la connexion
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
