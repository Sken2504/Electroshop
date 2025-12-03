const Cart = require('../models/Cartmodel');
const Product = require('../models/Productmodel');

const findOrCreateCart = async (userId) => {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
        cart = new Cart({ userId, items: [] });
        await cart.save();
    }
    return cart;
};

exports.addItem = async (userId, productId, quantity) => {
    const cart = await findOrCreateCart(userId);
    const product = await Product.findOne({ id: productId });

    if (!product) {
        throw new Error('Sản phẩm không tồn tại.');
    }
    if (product.stock < quantity) {
        throw new Error(`Kho chỉ còn ${product.stock} sản phẩm.`);
    }

    const itemIndex = cart.items.findIndex(item => item.productId === productId);

    if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
    } else {
        cart.items.push({
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity
        });
    }

    await cart.save();
    return product;
};

exports.updateItemQuantity = async (userId, productId, newQuantity) => {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
        throw new Error('Giỏ hàng không tồn tại.');
    }

    const itemIndex = cart.items.findIndex(item => item.productId === productId);

    if (itemIndex > -1) {
        if (newQuantity <= 0) {
            cart.items.splice(itemIndex, 1);
        } else {
            const product = await Product.findOne({ id: productId });
            if (product.stock < newQuantity) {
                throw new Error(`Kho chỉ còn ${product.stock} sản phẩm.`);
            }
            cart.items[itemIndex].quantity = newQuantity;
        }
        await cart.save();
        return await this.getCartContent(userId);
    } else {
        throw new Error('Sản phẩm không có trong giỏ hàng.');
    }
};

exports.removeItem = async (userId, productId) => {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
        throw new Error('Giỏ hàng không tồn tại.');
    }

    const initialLength = cart.items.length;
    cart.items = cart.items.filter(item => item.productId !== productId);

    if (cart.items.length === initialLength) {
        throw new Error('Không tìm thấy sản phẩm để xóa.');
    }

    await cart.save();
    return await this.getCartContent(userId);
};

exports.applyPromoCode = async (userId, code) => {
    const cart = await Cart.findOne({ userId }); 
    if (!cart) {
        throw new Error('Giỏ hàng không tồn tại.');
    }
    
    if (cart.promoCode && cart.promoCode === code) {
        throw new Error(`Mã "${code}" đã được áp dụng trước đó!`); 
    }
    
    let discountPercent = 0;
    if (code === 'DISCOUNT10') {
        discountPercent = 0.10; 
    } else if (code === 'SAVE20') {
        discountPercent = 0.20; 
    } else if (code === 'BIGSALE50') {
        discountPercent = 0.50;
    } else {
        throw new Error('Mã giảm giá không hợp lệ.');
    }
    
    const cartContent = await this.getCartContent(userId);
    const discountAmount = cartContent.subtotal * discountPercent;
    
    cart.promoCode = code; 
    await cart.save();
    
    return {
        ...cartContent,
        discount: discountAmount,
        total: cartContent.subtotal + cartContent.shippingFee - discountAmount,
    };
};

exports.getCartContent = async (userId) => {
    const cart = await findOrCreateCart(userId);
    const subtotal = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingFee = subtotal >= 500000 ? 0 : 30000;
    
    let discount = 0;
    
    if (cart.promoCode) {
        const tempCart = { subtotal, shippingFee, discount: 0, total: 0 };
        
        let discountPercent = 0;
        if (cart.promoCode === 'DISCOUNT10') {
            discountPercent = 0.10; 
        } else if (cart.promoCode === 'SAVE20') {
            discountPercent = 0.20; 
        } else if (cart.promoCode === 'BIGSALE50') {
            discountPercent = 0.50; 
        } else if (cart.promoCode === 'FREE') {
            discountPercent = 1.00; 
        }
        discount = subtotal * discountPercent;
    }
    
    const total = subtotal + shippingFee - discount;
    
    return {
        items: cart.items,
        subtotal,
        shippingFee,
        discount,
        total
    };
};