const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
    productId: { type: Number, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    image: { type: String },
});

const OrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    customerName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String },
    district: { type: String },
    ward: { type: String },
    notes: { type: String }, 

    items: [OrderItemSchema], 

    subtotal: { type: Number, required: true },
    shippingFee: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    VAT: { type: Number, default: 0.1 }, 
    totalAmount: { type: Number, required: true },
    paymentMethod: { 
        type: String, 
        enum: ['cod', 'bank', 'momo', 'vnpay', 'tra_gop'], 
        required: true 
    },

    status: { 
        type: String, 
        enum: [
            'Chờ xác nhận',
            'Đã xác nhận',
            'Đang giao',
            'Đã giao',
            'Đã hủy'
        ], 
        default: 'Chờ xác nhận' 
    },

    orderId: { type: String, required: true, unique: true }, 
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);