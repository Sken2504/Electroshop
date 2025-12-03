const mongoose = require('mongoose');
const Product = require('./src/models/Productmodel');
const productsData = require('./src/data/productData');

require('dotenv').config();

const PRODUCT_ID_TO_RECOVER = 1;

if (!process.env.MONGO_URI) {
    console.error('Vui lòng cung cấp MONGO_URI trong file .env');
    process.exit(1);
}

// Hàm phụ trợ để lấy chuỗi summary từ dữ liệu gốc phức tạp
function getSpecsSummaryString(data) {
    // Trường specs đơn giản (String) thường được đặt trước trong productsData
    if (typeof data.specs === 'string') {
        return data.specs;
    }
    // Nếu không, tạo chuỗi từ object chi tiết để đảm bảo không bị lỗi Cast
    if (data.specs && data.specs['Màn hình'] && data.specs['Chip xử lý']) {
        return `${data.specs['Màn hình']} | ${data.specs['Chip xử lý']}`;
    }
    return 'Đang cập nhật';
}

const recoverData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB for recovery.');

        const originalProductData = productsData.find(p => p.id === PRODUCT_ID_TO_RECOVER);

        if (!originalProductData) {
            console.error('Không tìm thấy dữ liệu gốc của sản phẩm ID #1.');
            return;
        }

        const productToInsertData = {
            // Lấy toàn bộ thuộc tính
            ...originalProductData,
            // FIX LỖI: Chỉ định rõ trường specsSummary phải là string
            specsSummary: getSpecsSummaryString(originalProductData),
            specsDetail: originalProductData.specs, // Gán object chi tiết
            stock: 30
        };

        // Loại bỏ trường specs bị trùng lặp trong dữ liệu gốc trước khi chèn
        delete productToInsertData.specs;

        const existingProduct = await Product.findOne({ id: PRODUCT_ID_TO_RECOVER });

        if (existingProduct) {
            console.log(`⚠️ Sản phẩm ID #${PRODUCT_ID_TO_RECOVER} đã tồn tại. Đang cập nhật...`);
            await Product.updateOne(
                { id: PRODUCT_ID_TO_RECOVER },
                { $set: productToInsertData }
            );
        } else {
            const productToInsert = new Product(productToInsertData);
            await productToInsert.save();
            console.log(`🎉 Khôi phục thành công sản phẩm ID #${PRODUCT_ID_TO_RECOVER}: ${originalProductData.name}`);
        }

    } catch (error) {
        console.error('❌ Khôi phục thất bại:', error.message);
    } finally {
        mongoose.connection.close();
        console.log('Kết nối Database đã đóng.');
    }
};

recoverData();