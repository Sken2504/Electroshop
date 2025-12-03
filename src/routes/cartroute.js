const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartcontroller');
const { protect } = require('../middlewares/authmiddleware');

router.use(protect);

router.post('/add', cartController.addToCart);
router.get('/', cartController.getCart);
router.put('/items/:id', cartController.updateQuantity); 
router.delete('/items/:id', cartController.removeItem);  
router.post('/apply-promo', cartController.applyPromo);

module.exports = router;