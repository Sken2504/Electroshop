const Order = require('../models/Ordermodel');
const User = require('../models/Usermodel');
const Product = require('../models/Productmodel');
const Category = require('../models/Categorymodel');
const orderService = require('../services/orderservice');
const Setting = require('../models/Settingmodel');

const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const mongoose = require('mongoose');


// Cấu hình Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

exports.getStats = async (req, res) => {
    try {
        const totalRevenue = await orderService.calculateTotalRevenue();
        
        const totalOrders = await Order.countDocuments();
        const totalProducts = await Product.countDocuments(); 
        const totalCustomers = await User.countDocuments({ role: 'user' });

        res.status(200).json({
            success: true,
            totalRevenue, 
            totalOrders,
            totalProducts,
            totalCustomers,
        });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy dữ liệu thống kê: ' + error.message });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const orderId = req.params.id; 
        const { status } = req.body; 

        if (!status) {
            return res.status(400).json({ message: 'Vui lòng cung cấp trạng thái mới.' });
        }
        
        // Gọi Service để xử lý nghiệp vụ (cập nhật trạng thái và hoàn kho nếu hủy)
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

exports.getProducts = async (req, res) => {
    try {
        const { sortBy = 'id', sortOrder = 'asc' } = req.query;

        let sortCriteria = {};
        const order = sortOrder === 'desc' ? -1 : 1;

        if (sortBy === 'category') {
            sortCriteria.category = order;
        } else if (sortBy === 'price') {
            sortCriteria.price = order;
        } else {
            sortCriteria.id = order;
        }

        const products = await Product.find().sort(sortCriteria);
        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách sản phẩm.' });
    }
};

exports.getProductDetails = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm.' });
        }
        res.status(200).json({ product });
    } catch (error) {
        res.status(400).json({ message: 'Lỗi khi lấy chi tiết sản phẩm: ' + error.message });
    }
};

exports.createProduct = async (req, res) => {
    let imageUrl = '';

    try {
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "electroshop_products"
            });
            imageUrl = result.secure_url;
            fs.unlinkSync(req.file.path);
        } else {
            imageUrl = 'img/default.jpg';
        }

        const maxProduct = await Product.findOne().sort({ id: -1 });
        const newId = maxProduct ? maxProduct.id + 1 : 1;

        const productData = {
            ...req.body,
            image: imageUrl,
            id: newId
        };

        const product = new Product(productData);
        await product.save();
        res.status(201).json({ message: 'Thêm sản phẩm thành công!', product });
    } catch (error) {
        if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
        res.status(400).json({ message: 'Lỗi khi tạo sản phẩm: ' + error.message });
    }
};

exports.updateProduct = async (req, res) => {
    let updateData = { ...req.body };

    try {
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "electroshop_products"
            });
            fs.unlinkSync(req.file.path);
            updateData.image = result.secure_url;
        } else if (req.body.imageURLOld) {
            updateData.image = req.body.imageURLOld;
        }

        if (updateData.id) {
            delete updateData.id;
        }

        const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!product) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm.' });
        }
        res.status(200).json({ message: 'Cập nhật sản phẩm thành công!', product });
    } catch (error) {
        if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
        res.status(400).json({ message: 'Lỗi khi cập nhật sản phẩm: ' + error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const result = await Product.findByIdAndDelete(req.params.id);

        if (!result) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm để xóa.' });
        }

        res.status(200).json({ message: 'Đã xóa sản phẩm thành công.' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi xóa sản phẩm: ' + error.message });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách đơn hàng.' });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const { id } = req.params;

        if (!status || typeof status !== 'string') {
            return res.status(400).json({ message: 'Vui lòng nhập trạng thái mới!' });
        }

        if (!id || id.length < 12) {
            return res.status(400).json({ message: 'ID đơn hàng không hợp lệ.' });
        }

        const normalized = status.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        const statusMap = {
            'da xac nhan': 'Đã xác nhận',
            'dang giao': 'Đang giao',
            'da giao': 'Đã giao',
            'da huy': 'Đã hủy',
            'cho xac nhan': 'CHỜ XÁC NHẬN',
            'confirmed': 'Đã xác nhận',
            'shipping': 'Đang giao',
            'delivered': 'Đã giao',
            'cancelled': 'Đã hủy',
            'pending': 'CHỜ XÁC NHẬN'
        };

        const finalStatus = statusMap[normalized] || status.trim();

        const allowed = ['Đã xác nhận', 'Đang giao', 'Đã giao', 'Đã hủy', 'CHỜ XÁC NHẬN'];
        if (!allowed.includes(finalStatus)) {
            return res.status(400).json({
                message: 'Trạng thái không hợp lệ! Chỉ chấp nhận:\n• Đã xác nhận\n• Đang giao\n• Đã giao\n• Đã hủy'
            });
        }

        const order = await Order.findByIdAndUpdate(
            id,
            { status: finalStatus },
            { new: true, runValidators: true }
        );

        if (!order) {
            return res.status(404).json({ message: 'Không tìm thấy đơn hàng!' });
        }

        res.status(200).json({ message: 'Cập nhật trạng thái thành công!', order });

    } catch (error) {
        console.error('Lỗi updateOrderStatus:', error);
        res.status(500).json({ message: 'Lỗi server khi cập nhật trạng thái.' });
    }
};

exports.getCustomers = async (req, res) => {
    try {
        const customers = await User.find({ role: 'user' })
            .select('-password -role')
            .sort({ createdAt: -1 });

        const completedStatuses = [
            'Đã giao', 'ĐÃ GIAO', 'delivered',
            'Đã xác nhận', 'ĐÃ XÁC NHẬN', 'confirmed'
        ];

        const customerStats = await Order.aggregate([
            {
                $match: {
                    status: { $in: completedStatuses }
                }
            },
            {
                $group: {
                    _id: '$userId',
                    totalOrders: { $sum: 1 },
                    totalSpent: { $sum: '$totalAmount' }
                }
            }
        ]);

        const detailedCustomers = customers.map(customer => {
            const stats = customerStats.find(stat =>
                stat._id && customer._id.toString() === stat._id.toString()
            ) || { totalOrders: 0, totalSpent: 0 };

            return {
                ...customer.toObject(),
                totalOrders: stats.totalOrders,
                totalSpent: stats.totalSpent
            };
        });

        res.status(200).json({ customers: detailedCustomers });

    } catch (error) {
        console.error('Lỗi getCustomers:', error);
        res.status(500).json({ message: 'Lỗi server khi tải danh sách khách hàng.' });
    }
};

exports.getCategories = async (req, res) => {
    try {
        const categoriesWithCount = await mongoose.model('Category').aggregate([
            {
                $project: {
                    name: 1,
                    key: 1,
                    createdAt: 1
                }
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'key',
                    foreignField: 'category',
                    as: 'products'
                }
            },
            {
                $addFields: {
                    productCount: { $size: '$products' }
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    key: 1,
                    productCount: 1,
                    createdAt: 1
                }
            },
            {
                $sort: {
                    key: 1 
                }
            }
        ]);

        res.status(200).json({ categories: categoriesWithCount });
    } catch (error) {
        console.error('Lỗi khi lấy danh mục:', error);
        res.status(500).json({ 
            message: 'Lỗi khi lấy danh mục.',
            categories: [] 
        });
    }
};

exports.createCategory = async (req, res) => {
    try {
        const category = new Category(req.body);
        await category.save();
        res.status(201).json({ message: 'Thêm danh mục thành công!', category });
    } catch (error) {
        res.status(400).json({ message: 'Lỗi khi tạo danh mục: ' + error.message });
    }
};

exports.getCategoryDetails = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Không tìm thấy danh mục.' });
        }
        res.status(200).json({ category });
    } catch (error) {
        res.status(400).json({ message: 'Lỗi khi tải chi tiết danh mục: ID không hợp lệ.' });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!category) {
            return res.status(404).json({ message: 'Không tìm thấy danh mục.' });
        }
        res.status(200).json({ message: 'Cập nhật danh mục thành công!', category });
    } catch (error) {
        res.status(400).json({ message: 'Lỗi khi cập nhật danh mục: ' + error.message });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const result = await Category.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Không tìm thấy danh mục.' });
        }
        res.status(200).json({ message: 'Xóa danh mục thành công!' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi xóa danh mục.' });
    }
};

exports.getSettings = async (req, res) => {
    try {
        const settings = await Setting.findOne({ settingId: 'GLOBAL_CONFIG' });
        
        if (!settings) {
             const defaultSettings = new Setting();
             await defaultSettings.save();
             return res.status(200).json({ settings: defaultSettings });
        }
        
        res.status(200).json({ settings });
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu cài đặt:', error);
        res.status(500).json({ message: 'Lỗi khi lấy dữ liệu cài đặt.' });
    }
};

exports.updateSettings = async (req, res) => {
    try {
        const updates = {};
        
        // --- Cập nhật Form 1: Thông tin cửa hàng ---
        if (req.body.shopName) updates.shopName = req.body.shopName;
        if (req.body.shopEmail) updates.shopEmail = req.body.shopEmail;
        if (req.body.shopPhone) updates.shopPhone = req.body.shopPhone;
        if (req.body.shopAddress) updates.shopAddress = req.body.shopAddress;
        if (req.body.shopDescription) updates.shopDescription = req.body.shopDescription;

        // --- Cập nhật Form 2: Thanh toán 
        if (req.body.paymentCod !== undefined) updates['payment.paymentCod'] = req.body.paymentCod;
        if (req.body.paymentBank !== undefined) updates['payment.paymentBank'] = req.body.paymentBank;
        if (req.body.paymentEwallet !== undefined) updates['payment.paymentEwallet'] = req.body.paymentEwallet;
        if (req.body.paymentCard !== undefined) updates['payment.paymentCard'] = req.body.paymentCard;
        if (req.body.bankAccount) updates['payment.bankAccount'] = req.body.bankAccount;
        if (req.body.bankName) updates['payment.bankName'] = req.body.bankName;

        // --- Cập nhật Form 3: Vận chuyển 
        if (req.body.shipGhn !== undefined) updates['shipping.shipGhn'] = req.body.shipGhn;
        if (req.body.shipGhtk !== undefined) updates['shipping.shipGhtk'] = req.body.shipGhtk;
        if (req.body.shipVnpost !== undefined) updates['shipping.shipVnpost'] = req.body.shipVnpost;
        if (req.body.shipJt !== undefined) updates['shipping.shipJt'] = req.body.shipJt;
        if (req.body.defaultShippingFee) updates['shipping.defaultShippingFee'] = req.body.defaultShippingFee;
        if (req.body.freeShippingMin) updates['shipping.freeShippingMin'] = req.body.freeShippingMin;
        
        
        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ message: 'Không có dữ liệu hợp lệ để cập nhật.' });
        }

        const settings = await Setting.findOneAndUpdate(
            { settingId: 'GLOBAL_CONFIG' }, 
            { $set: updates },
            { new: true, upsert: true, runValidators: true }
        );
        
        res.status(200).json({ message: 'Cập nhật cài đặt thành công!', settings });
    } catch (error) {
        console.error('Lỗi khi cập nhật cài đặt:', error);
        res.status(400).json({ message: 'Lỗi khi cập nhật cài đặt.' });
    }
};