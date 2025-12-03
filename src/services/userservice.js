const User = require('../models/Usermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getProfile = async (userId) => {
    const user = await User.findById(userId).select('name email phone dob gender');
    if (!user) {
        throw new Error('Không tìm thấy người dùng.');
    }
    return user;
};

exports.updateProfile = async (userId, updateData) => {
    const user = await User.findByIdAndUpdate(
        userId,
        { 
            name: updateData.name, 
            phone: updateData.phone, 
            dob: updateData.dob, 
            gender: updateData.gender 
        },
        { new: true, runValidators: true }
    ).select('name email phone dob gender');
    
    if (!user) {
        throw new Error('Người dùng không tồn tại.');
    }
    return user;
};

exports.changePassword = async (userId, currentPassword, newPassword) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new Error('Người dùng không tồn tại.');
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
        throw new Error('Mật khẩu hiện tại không chính xác.');
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return true;
};