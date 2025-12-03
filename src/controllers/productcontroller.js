const productService = require('../services/productservice');

exports.getProducts = async (req, res) => {
    try {
        console.log('Received Product Filters:', req.query); 

        const filters = {
            category: req.query.category,
            brand: req.query.brand ? req.query.brand.split(',') : [],
            storage: req.query.storage ? req.query.storage.split(',') : [],
            ram: req.query.ram ? req.query.ram.split(',') : [],
            minPrice: req.query.minPrice,
            maxPrice: req.query.maxPrice,
            q: req.query.q,
            sort: req.query.sort
        };

        const result = await productService.findProducts(filters);

        res.status(200).json({
            message: 'Lấy danh sách sản phẩm thành công',
            products: result.products, 
            totalItems: result.totalItems
        });

    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách sản phẩm.' });
    }
};

exports.getProductDetail = async (req, res) => {
    try {
        const productId = req.params.id; 

        const product = await productService.findProductById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm.' });
        }

        res.status(200).json({ product });

    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy chi tiết sản phẩm.' });
    }
};