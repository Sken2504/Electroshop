require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGO_URI;

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

app.use(cors());
app.use(express.json());

mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ MongoDB connected successfully.'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

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