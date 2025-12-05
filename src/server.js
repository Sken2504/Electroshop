require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Đã có sẵn

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGO_URI;

// Require Routes
const authRoute = require('./routes/authroute');
const productRoute = require('./routes/productroute');
const cartRoute = require('./routes/cartroute');
const userRoute = require('./routes/userroute');
const orderRoute = require('./routes/orderroute'); 
const adminRoute = require('./routes/adminroute'); 
const contactRoute = require('./routes/contactroute');

const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

// --- CẤU HÌNH CORS ĐỂ KHẮC PHỤC LỖI TRUY CẬP CỤC BỘ ---
const allowedOrigins = [
    'http://127.0.0.1:5500', // Cho phép Live Server truy cập
    'http://localhost:5500'  // Cho phép Localhost truy cập
    // Có thể thêm domain production ở đây nếu cần
];

const corsOptions = {
    origin: function (origin, callback) {
        // Cho phép các nguồn gốc trong danh sách, HOẶC nếu request không có origin (ví dụ: Postman)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true // Quan trọng để gửi cookies, token xác thực, v.v.
};

// Áp dụng cấu hình CORS mới
app.use(cors(corsOptions));
// --------------------------------------------------------

app.use(express.json());

mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ MongoDB connected successfully.'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// Route Middlewares
app.use('/api/auth', authRoute);
app.use('/api/products', productRoute);
app.use('/api/cart', cartRoute);
app.use('/api/users', userRoute);
app.use('/api/orders', orderRoute);
app.use('/api/admin', adminRoute);
app.use('/api/contact', contactRoute);

app.get('/', (req, res) => {
    res.send('ElectroShop API is running.');
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('Global error:', err);
    res.status(500).json({
        message: 'Có lỗi xảy ra từ server!',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});