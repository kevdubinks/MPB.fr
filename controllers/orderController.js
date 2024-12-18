const Order = require('../models/Order');

// Créer une commande
exports.createOrder = async (req, res) => {
    try {
        const order = new Order(req.body);
        const newOrder = await order.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtenir toutes les commandes
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user').populate('products.product');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtenir une commande par ID
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user').populate('products.product');
        if (!order) return res.status(404).json({ message: 'Commande non trouvée' });
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
