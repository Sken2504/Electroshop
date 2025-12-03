const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtconfig');
const User = require('../models/Usermodel');exports.protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }if (!token) {
    return res.status(401).json({ message: 'Lỗi: Không được phép truy cập. Thiếu Token.' });
}

try {
    const decoded = jwt.verify(token, jwtConfig.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password'); 
    if (!req.user) {
        return res.status(401).json({ message: 'Lỗi: User không còn tồn tại.' });
    }
    next();
} catch (error) {
    return res.status(401).json({ message: 'Lỗi: Token không hợp lệ hoặc đã hết hạn.' });
}};

