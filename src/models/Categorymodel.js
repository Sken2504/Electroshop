const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true 
    },
    key: { 
        type: String, 
        required: true, 
        unique: true 
    },
    description: { 
        type: String 
    },
    order: { 
        type: Number 
    },
    productCount: { 
        type: Number, 
        default: 0 
    }
});

module.exports = mongoose.model('Category', CategorySchema);