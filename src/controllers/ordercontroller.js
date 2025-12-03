const orderService = require('../services/orderservice');
const checkoutService = require('../services/checkoutservice'); 

exports.placeOrder = async (req, res) => {
    try {
        const userId = req.user._id;
        const { customerInfo, paymentMethod, discountCode } = req.body; 

        if (!customerInfo || !paymentMethod) {
            return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin đặt hàng.' });
        }
        
        let paymentMethodFinal = paymentMethod;
        if (paymentMethod === 'Trả góp 0% qua thẻ tín dụng' || paymentMethod === 'trả góp') {
            paymentMethodFinal = 'tra_gop';
        } else if (paymentMethod === 'bank_transfer') {
             paymentMethodFinal = 'bank';
        }


        const orderInfo = await orderService.createOrderTransaction(userId, customerInfo, paymentMethodFinal, discountCode);
        const amountInVND = orderInfo.totalAmount; 
        const orderId = orderInfo.orderId;

        let paymentUrl = null;
        let qrInfo = null;
        const ipAddr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        
        if (paymentMethodFinal === 'vnpay') {
            paymentUrl = checkoutService.createVnPayUrl(orderId, amountInVND, ipAddr);
        } else if (paymentMethodFinal === 'momo') {
            const orderInfoText = 'Thanh toan don hang ' + orderId;
            paymentUrl = await checkoutService.createMomoUrl(orderId, amountInVND, orderInfoText);
        } else if (paymentMethodFinal === 'bank') { 
            qrInfo = await checkoutService.createVietQRInfo(orderId, amountInVND);
        }

        if (paymentUrl) {
            return res.status(200).json({
                message: `Khởi tạo thanh toán ${paymentMethod.toUpperCase()} thành công.`,
                paymentUrl: paymentUrl,
                paymentRequired: true,
                orderId: orderId,
            });
        } 
        
        if (qrInfo) {
            return res.status(200).json({
                message: 'Khởi tạo chuyển khoản thành công.',
                qrInfo: qrInfo,
                orderId: orderId,
                paymentRequired: true
            });
        }
        
        res.status(201).json({
            message: 'Đặt hàng thành công! Đơn hàng đang chờ xác nhận.', 
            orderId: orderId, 
        });

    } catch (error) {
        res.status(400).json({ message: error.message || 'Lỗi đặt hàng không xác định.' });
    }
};

exports.getOrderHistory = async (req, res) => {
    try {
        const userId = req.user._id;
        const status = req.query.status || 'all'; 

        const orders = await orderService.getOrderHistory(userId, status);

        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy lịch sử đơn hàng.' });
    }
};

exports.cancelOrder = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const order = await orderService.cancelOrder(orderId);

        res.status(200).json({
            message: `Đơn hàng #${orderId} đã được hủy thành công.`,
            order,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getOrderDetails = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const order = await orderService.getOrderDetails(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Không tìm thấy đơn hàng này.' });
        }
        res.status(200).json({ order });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy chi tiết đơn hàng.' });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ message: 'Vui lòng cung cấp trạng thái mới.' });
        }
        
        const order = await orderService.updateOrderStatus(orderId, status);

        res.status(200).json({
            success: true,
            message: `Cập nhật trạng thái đơn hàng #${orderId} thành công!`,
            order,
        });

    } catch (error) {
        res.status(400).json({ message: error.message || 'Lỗi cập nhật trạng thái đơn hàng.' });
    }
};