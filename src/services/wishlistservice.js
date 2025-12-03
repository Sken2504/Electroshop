const Wishlist = require('../models/Wishlistmodel');

exports.getWishlistByUserId = async (userId) => {
    return Wishlist.find({ userId }).select('productId');
};

exports.toggleWishlist = async (userId, productId) => {
    const existingItem = await Wishlist.findOne({ userId, productId });

    if (existingItem) {
        await Wishlist.deleteOne({ userId, productId });
        return { action: 'removed', productId };
    } else {
        const newItem = new Wishlist({ userId, productId });
        await newItem.save();
        return { action: 'added', productId };
    }
};