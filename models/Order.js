const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    products: [
        {
            product: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Product', 
                required: true 
            },
            quantity: { 
                type: Number, 
                required: true 
            },
            price: { 
                type: Number, 
                required: true 
            }
        }
    ],
    totalAmount: { 
        type: Number, 
        required: true 
    },
    shippingAddress: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true, default: "France" },
        phone: { type: String, required: true }
    },
    status: { 
        type: String, 
        enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'], 
        default: 'Pending' 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
