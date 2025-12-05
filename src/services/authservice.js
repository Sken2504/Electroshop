const User = require('../models/Usermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtconfig');

const JWT_SECRET = 'YOUR_SECRET_KEY';

exports.registerUser = async (name, email, phone, password) => {

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('Email đã tồn tại trong hệ thống.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        name,
        email,
        phone,
        password: hashedPassword,
    });
    await newUser.save();
    return newUser;
};

exports.loginUser = async (username, password) => {
    const user = await User.findOne({
        $or: [{ email: username }, { phone: username }]
    });

    if (!user) {
        throw new Error('Email/Số điện thoại hoặc mật khẩu không chính xác.');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Email/Số điện thoại hoặc mật khẩu không chính xác.');
    }

    const token = jwt.sign({ id: user._id, role: user.role }, jwtConfig.JWT_SECRET, {
        expiresIn: '1d',
    });

    return { user, token };
};