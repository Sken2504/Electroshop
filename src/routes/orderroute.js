const express = require('express');
const router = express.Router();
const orderController = require('../controllers/ordercontroller');
const { protect } = require('../middlewares/authmiddleware');

router.use(protect);

router.post('/', orderController.placeOrder);

router.get('/history', orderController.getOrderHistory);

router.put('/:orderId/cancel', orderController.cancelOrder);

router.get('/:orderId', orderController.getOrderDetails); 

module.exports = router;