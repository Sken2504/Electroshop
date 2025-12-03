const authService = require('../services/authservice');exports.handleRegister = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;     if (!name || !email || !password || !phone) {
        return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin bắt buộc.' });
    }

    const newUser = await authService.registerUser(name, email, phone, password);

    res.status(201).json({ 
        message: 'Đăng ký thành công! Chào mừng bạn đến với ElectroShop.',
        user: { id: newUser._id, name: newUser.name }
    });

} catch (error) {
    if (error.message.includes('Email đã tồn tại')) {
        return res.status(409).json({ message: error.message });
    }
    res.status(500).json({ message: 'Lỗi máy chủ nội bộ.' });
}};exports.handleLogin = async (req, res) => {
    try {
        const { username, password } = req.body;     if (!username || !password) {
        return res.status(400).json({ message: 'Vui lòng nhập email và mật khẩu.' });
    }

    const { user, token } = await authService.loginUser(username, password);

    res.status(200).json({
        message: 'Đăng nhập thành công! Chào mừng bạn trở lại.',
        token: token,
        user: { id: user._id, name: user.name, email: user.email, role: user.role } 
    });

} catch (error) {
    res.status(401).json({ message: error.message || 'Email hoặc mật khẩu không chính xác.' });
}};

