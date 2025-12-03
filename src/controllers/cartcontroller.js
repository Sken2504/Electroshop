const cartService = require('../services/cartservice');

exports.addToCart = async (req, res) => {
    const userId = req.user._id; 
    const { productId, quantity } = req.body;

    if (!productId || !quantity || quantity < 1) {
        return res.status(400).json({ message: 'Dữ liệu sản phẩm không hợp lệ.' });
    }

    try {
        const product = await cartService.addItem(userId, productId, quantity);
        
        res.status(200).json({ 
            message: `Sản phẩm "${product.name}" đã được thêm vào giỏ hàng!`, 
            productName: product.name
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateQuantity = async (req, res) => {
    const userId = req.user._id;
    const productId = parseInt(req.params.id);
    const { quantity } = req.body; 

    if (isNaN(productId) || !quantity) {
        return res.status(400).json({ message: 'Dữ liệu không hợp lệ.' });
    }

    try {
        const updatedCart = await cartService.updateItemQuantity(userId, productId, quantity);
        res.status(200).json({ 
            message: 'Cập nhật giỏ hàng thành công.', 
            cart: updatedCart 
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.removeItem = async (req, res) => {
    const userId = req.user._id;
    const productId = parseInt(req.params.id);

    try {
        const updatedCart = await cartService.removeItem(userId, productId);
        res.status(200).json({ 
            message: 'Đã xóa sản phẩm khỏi giỏ hàng.', 
            cart: updatedCart 
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.applyPromo = async (req, res) => {
    const userId = req.user._id;
    const { code } = req.body;

    if (!code) {
        return res.status(400).json({ message: 'Vui lòng nhập mã giảm giá.' });
    }

    try {
        const updatedCart = await cartService.applyPromoCode(userId, code.toUpperCase());
        res.status(200).json({ 
            message: 'Áp dụng mã giảm giá thành công!', 
            cart: updatedCart 
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getCart = async (req, res) => {
    try {
        const userId = req.user._id; 
        const cartContent = await cartService.getCartContent(userId);
        
        res.status(200).json(cartContent);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy thông tin giỏ hàng.' });
    }
};
