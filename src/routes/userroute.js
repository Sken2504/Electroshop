const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller');
const { protect } = require('../middlewares/authmiddleware');

router.use(protect); 

router.route('/me')
    .get(userController.getMe)
    .put(userController.updateMe);

router.post('/change-password', userController.changePassword);

router.get('/wishlist', userController.getWishlist);
router.post('/wishlist/toggle', userController.toggleWishlist)

module.exports = router;