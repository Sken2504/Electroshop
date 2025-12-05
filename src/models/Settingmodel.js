const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    paymentCod: { type: Boolean, default: true },
    paymentBank: { type: Boolean, default: true },
    paymentEwallet: { type: Boolean, default: false },
    paymentCard: { type: Boolean, default: false },
    bankAccount: { type: String, default: '1234567890' },
    bankName: { type: String, default: 'Vietcombank' },
});

const ShippingSchema = new mongoose.Schema({
    shipGhn: { type: Boolean, default: true },
    shipGhtk: { type: Boolean, default: true },
    shipVnpost: { type: Boolean, default: false },
    shipJt: { type: Boolean, default: false },
    defaultShippingFee: { type: Number, default: 30000 },
    freeShippingMin: { type: Number, default: 500000 }
});

const SettingSchema = new mongoose.Schema({
    // --- Thông tin cửa hàng  ---
    shopName: { type: String, default: 'ElectroShop' },
    shopEmail: { type: String, default: 'support@electroshop.vn' },
    shopPhone: { type: String, default: '0123456789' },
    shopAddress: { type: String, default: '123 Nguyễn Huệ, Q.1, TP.HCM' },
    shopDescription: { type: String, default: 'ElectroShop - Cửa hàng điện tử uy tín hàng đầu Việt Nam' },
    
    // --- Thanh toán ---
    payment: { type: PaymentSchema, default: () => ({}) },
    
    // --- Vận chuyển ---
    shipping: { type: ShippingSchema, default: () => ({}) },

    settingId: { type: String, default: 'GLOBAL_CONFIG', unique: true } 
}, { timestamps: true });

module.exports = mongoose.model('Setting', SettingSchema);