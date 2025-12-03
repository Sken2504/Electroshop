exports.adminProtect = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Lỗi: Không có quyền truy cập quản trị.' });
    }
};