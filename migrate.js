require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./src/models/Productmodel'); 
const productsData = require('./src/data/productData'); 

const importData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI); 
        console.log('✅ Connected to MongoDB for migration.');

        await Product.deleteMany();
        console.log('🗑️ Existing products deleted.');

        const structuredData = productsData.map(p => ({
            ...p,
            id: p.id,
            specsSummary: p.specsSummary || (p.specs ? `${p.specs['Màn hình']} | ${p.specs['Chip xử lý']}` : null),
            specsDetail: p.specs,
            stock: p.stock || 30
        }));

        await Product.insertMany(structuredData);
        console.log(`🎉 Data import successful! Total ${structuredData.length} products added.`);

    } catch (error) {
        console.error('❌ Migration failed:', error.message);
    } finally {
        mongoose.connection.close();
        console.log('Database connection closed.');
    }
};

importData();