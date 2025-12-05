const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true }, 
    email: { type: String, required: true, unique: true }, 
    phone: { type: String, required: true },   
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    dob: { type: Date },
    gender: { type: String },
    passwordResetToken: { type: String },
    passwordResetExpires: { type: Date }
});

module.exports = mongoose.model('User', UserSchema);