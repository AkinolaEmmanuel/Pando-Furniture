import { ShoppingCart, Heart, Star } from 'lucide-react';
import { useCart } from '../contexts/cartcontext';
import { useAuth } from '../contexts/authcontext';
import { motion } from 'framer-motion';
import { useState } from 'react';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const { isLogged } = useAuth();
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    const handleAddToCart = () => {
        if (!isLogged) {
            toast.error('Please login to add items to cart');
            return;
        }
        addToCart(product);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    };

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-4 h-4 ${
                    i < Math.floor(rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                }`}
            />
        ));
    };

    return (
        <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            {/* Product Image */}
            <div className="relative h-64 overflow-hidden">
                {!imageLoaded && (
                    <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
                        <div className="text-gray-400">Loading...</div>
                    </div>
                )}
                <img
                    src={product.image}
                    alt={product.name}
                    className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                        imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => setImageLoaded(true)}
                    onError={(e) => {
                        e.target.src = '/placeholder-furniture.jpg';
                        setImageLoaded(true);
                    }}
                />
                
                {/* Discount Badge */}
                {product.discount > 0 && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
                        -{product.discount}%
                    </div>
                )}

                {/* Like Button */}
                <button
                    onClick={() => setIsLiked(!isLiked)}
                    className="absolute top-2 right-2 p-2 bg-white/80 dark:bg-gray-800/80 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors"
                >
                    <Heart
                        className={`w-5 h-5 ${
                            isLiked
                                ? 'text-red-500 fill-current'
                                : 'text-gray-600 dark:text-gray-300'
                        }`}
                    />
                </button>
            </div>

            {/* Product Info */}
            <div className="p-4">
                <div className="mb-2">
                    <span className="text-sm text-amber-600 dark:text-amber-400 font-medium uppercase tracking-wide">
                        {product.category}
                    </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {product.name}
                </h3>

                <p className="h-12 text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                    {product.description}
                </p>

                {/* Rating 
                <div className="flex items-center gap-1 mb-3">
                    {renderStars(product.rating || 4)}
                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                        ({product.rating || 4.0})
                    </span>
                </div>
                */}

                {/* Price and Add to Cart */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                            {formatPrice(product.price * (1 - product.discount / 100))}
                        </span>
                        {product.discount > 0 && (
                            <span className="text-sm text-gray-500 line-through">
                                {formatPrice(product.price)}
                            </span>
                        )}
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className="bg-amber-500 hover:bg-amber-600 text-white p-2 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
                    >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;