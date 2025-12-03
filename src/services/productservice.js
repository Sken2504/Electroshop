const Product = require('../models/Productmodel');

exports.findProducts = async (filters) => {
    const { category, brand, storage, ram, minPrice, maxPrice, q, sort } = filters;
    
    let query = {};
    
    if (category) {
        query.category = category;
    }
    
    if (brand && brand.length > 0) {
        query.brand = { $in: brand };
    }
    
    if (storage && storage.length > 0) {
        query.storage = { $in: storage };
    }
    if (ram && ram.length > 0) {
        query.ram = { $in: ram };
    }
    
    query.price = {
        $gte: parseFloat(minPrice) || 0,
        $lte: parseFloat(maxPrice) || Infinity
    };
    
    if (q) {
        query.name = { $regex: q, $options: 'i' }; 
    }

    let sortCriteria = {};
    if (sort === 'price-asc') { 
        sortCriteria.price = 1; 
    } else if (sort === 'price-desc') { 
        sortCriteria.price = -1;
    } else {
        sortCriteria.id = 1; 
    }

    console.log('Product Query:', query); 
    
    const products = await Product.find(query).sort(sortCriteria);
    
    return { products, totalItems: products.length };
};

exports.findProductById = async (id) => {
    return Product.findOne({ id }); 
};