import { model, Schema } from 'mongoose';

const WishlistSchema = new Schema ({
    productId: {
        type: String,
        ref: "Product"
    },
    userId: {
      type: String,
      ref: 'User'
    }
});

const wishlistModel = model('Wishlist', WishlistSchema);

export default wishlistModel