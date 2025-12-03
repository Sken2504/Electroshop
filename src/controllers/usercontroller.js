const userService = require('../services/userservice');
const wishlistService = require('../services/wishlistservice');

exports.getMe = async (req, res) => {
    try {
        const user = await userService.getProfile(req.user._id);
        res.status(200).json({ user });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.updateMe = async (req, res) => {
    try {
        const { name, phone, dob, gender } = req.body; 

        const updatedUser = await userService.updateProfile(req.user._id, {
            name, phone, dob, gender
        });

        res.status(200).json({ 
            message: 'Thông tin đã được cập nhật!',
            user: updatedUser 
        });
    } catch (error) {
        res.status(400).json({ message: 'Cập nhật thất bại: ' + error.message });
    }
};

exports.changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body; 

        if (!currentPassword || !newPassword || newPassword.length < 6) {
            return res.status(400).json({ message: 'Mật khẩu mới phải từ 6 ký tự trở lên.' });
        }

        await userService.changePassword(req.user._id, currentPassword, newPassword);

        res.status(200).json({ 
            message: 'Đổi mật khẩu thành công! Vui lòng đăng nhập lại.',
        });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.getWishlist = async (req, res) => {
    try {
        const userId = req.user._id;
        const wishlist = await wishlistService.getWishlistByUserId(userId);
        
        res.status(200).json({ wishlist });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách yêu thích.' });
    }
};

exports.toggleWishlist = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId } = req.body;
        
        if (!productId) {
            return res.status(400).json({ message: 'Thiếu ID sản phẩm.' });
        }

        const result = await wishlistService.toggleWishlist(userId, productId);
        
        res.status(200).json({ 
            message: 'Cập nhật danh sách yêu thích thành công.',
            action: result.action
        });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi cập nhật danh sách yêu thích.' });
    }
};