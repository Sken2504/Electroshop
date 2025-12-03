const mongoose = require('mongoose');
const Order = require('../models/Ordermodel');
const Cart = require('../models/Cartmodel');
const Product = require('../models/Productmodel');
const cartService = require('./cartservice');

const generateOrderId = () => 'DH' + Math.floor(100000 + Math.random() * 900000);

exports.createOrderTransaction = async (userId, customerInfo, paymentMethod, discountCode) => {
    
    const cartData = await cartService.getCartContent(userId, discountCode);
    if (cartData.items.length === 0) {
        throw new Error('Giỏ hàng trống. Không thể đặt hàng.');
    }

    let session;
    try {
        session = await mongoose.startSession();
        session.startTransaction();

        const orderItems = [];
        
        for (const cartItem of cartData.items) {
            const product = await Product.findOne({ id: cartItem.productId }).session(session);

            if (!product || product.stock < cartItem.quantity) {
                throw new Error(`Sản phẩm ${cartItem.name} chỉ còn ${product ? product.stock : 0} sản phẩm.`);
            }

            product.stock -= cartItem.quantity;
            await product.save({ session });

            orderItems.push({
                productId: cartItem.productId,
                name: cartItem.name,
                price: cartItem.price,
                quantity: cartItem.quantity,
                image: cartItem.image
            });
        }

        const VAT_RATE = 0.1;
        const totalBeforeVAT = cartData.subtotal - cartData.discount + cartData.shippingFee;
        const VAT_AMOUNT = totalBeforeVAT * VAT_RATE;
        const finalTotal = totalBeforeVAT + VAT_AMOUNT;

        const newOrder = new Order({
            userId,
            ...customerInfo,
            items: orderItems,
            subtotal: cartData.subtotal,
            shippingFee: cartData.shippingFee,
            discount: cartData.discount,
            VAT: VAT_RATE,
            totalAmount: finalTotal,
            paymentMethod,
            orderId: generateOrderId(),
        });

        await newOrder.save({ session });

        await Cart.deleteOne({ userId }).session(session);

        await session.commitTransaction();
        session.endSession();

        return newOrder;

    } catch (error) {
        if (session) await session.abortTransaction();
        session.endSession();
        throw error;
    }
};

exports.getOrderHistory = async (userId, status) => {
    let query = { userId };
    if (status && status !== 'all') {
        query.status = status;
    }

    return Order.find(query).sort({ createdAt: -1 });
};

exports.getOrderDetails = async (orderId) => {
    const order = await Order.findOne({ orderId });
    if (!order) {
        throw new Error('Không tìm thấy đơn hàng này.');
    }
    return order;
};

exports.cancelOrder = async (orderId) => {
    const order = await Order.findOne({ orderId });

    if (!order) {
        throw new Error('Không tìm thấy đơn hàng.');
    }

    if (order.status !== 'pending') {
        throw new Error(`Không thể hủy đơn hàng đang ở trạng thái: ${order.status}`);
    }

    await order.items.forEach(async (item) => {
        await Product.findOneAndUpdate(
            { id: item.productId },
            { $inc: { stock: item.quantity } }
        );
    });

    order.status = 'cancelled';
    await order.save();

    return order;
};

exports.updateOrderStatus = async (orderId, newStatus) => {
    const order = await Order.findOne({ orderId: orderId }); 

    if (!order) {
        throw new Error('Không tìm thấy đơn hàng này.');
    }

    if (order.status === 'Đã hủy') {
        throw new Error('Không thể thay đổi trạng thái đơn hàng đã bị hủy.');
    }

    if (newStatus === 'Đã hủy') {
        for (const item of order.items) {
            await Product.findOneAndUpdate(
                { id: item.productId },
                { $inc: { stock: item.quantity } }
            );
        }
    }
    
    order.status = newStatus;
    await order.save();

    return order;
};

exports.calculateTotalRevenue = async () => {
    const revenueStatuses = ['Đã xác nhận', 'Đã giao']; 
    
    const revenueResult = await Order.aggregate([
        { $match: { status: { $in: revenueStatuses } } },
        { $group: { _id: null, totalRevenue: { $sum: '$totalAmount' } } }
    ]);
    
    return revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;
};