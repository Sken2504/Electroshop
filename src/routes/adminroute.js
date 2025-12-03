const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admincontroller');
const { protect } = require('../middlewares/authmiddleware');
const { adminProtect } = require('../middlewares/adminmiddleware');
const multer = require('multer');
const upload = multer({ dest: 'temp_uploads/' });

router.use(protect, adminProtect); 

router.get('/stats', adminController.getStats); 

router.route('/products')
    .get(adminController.getProducts)

    .post(upload.single('productImage'), adminController.createProduct);

router.route('/products/:id')
    .get(adminController.getProductDetails) 
    .put(upload.single('productImage'), adminController.updateProduct) 
    .delete(adminController.deleteProduct);

router.get('/orders', adminController.getOrders); 
router.put('/orders/:id/status', adminController.updateOrderStatus); 

router.route('/categories')
    .get(adminController.getCategories)
    .post(adminController.createCategory);

router.route('/categories/:id')
    .put(adminController.updateCategory)
    .get(adminController.getCategoryDetails)
    .delete(adminController.deleteCategory);

router.get('/customers', adminController.getCustomers);

router.route('/settings')
    .get(adminController.getSettings)
    .put(adminController.updateSettings);
    
module.exports = router;