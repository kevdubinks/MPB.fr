const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');


const app = express();
const PORT = process.env.PORT || 3000;

// Configuration du moteur de vues
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connexion à MongoDB réussie'))
    .catch((error) => console.error('Erreur de connexion à MongoDB:', error));

// Middleware pour analyser le JSON
app.use(express.json());

// Importation des routes
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');


// Utilisation des routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
    res.render('index', { title: 'Accueil - Ma Petite Brocante' });
});

app.use(express.static(path.join(__dirname, 'public')));
// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur http://localhost:${PORT}`);
});
