const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String 
    },
    price: { 
        type: Number, 
        required: true 
    },
    category: { 
        type: String, 
        required: true 
    },
    stock: { 
        type: Number, 
        default: 0 
    },
    imageUrl: { 
        type: String 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
