const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true }, 
    name: { type: String, required: true },
    category: { type: String, required: true }, 
    brand: { 
        type: String, 
        default: 'Unknown'
    },
    storage: { type: String },
    ram: { type: String },
    price: { type: Number, required: true },
    oldPrice: { type: Number },
    rating: { type: Number, default: 0 },
    specsSummary: { 
        type: String, 
        default: 'Đang cập nhật'
    },
    badge: { type: String, enum: ['sale', 'new', 'hot', null], default: null },
    image: { type: String },
    description: { type: String },
    specsDetail: { type: Object }, 
    stock: { type: Number, default: 0 } 
});

module.exports = mongoose.model('Product', ProductSchema);