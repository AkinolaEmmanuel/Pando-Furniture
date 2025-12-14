import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../../contexts/cartcontext';
import { useAuth } from '../../contexts/authcontext';
import { useApi } from '../../hooks/useApi';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const CartPage = () => {
    const { purchases, removeFromCart, updateCartItem, cartCount } = useCart();
    const { isLogged, user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState({});

    useEffect(() => {
        if (!isLogged) {
            navigate('/login');
            return;
        }
        loadCartData();
    }, [isLogged]);

    const loadCartData = async () => {
        setLoading(true);
        try {
            // Load cart data

            const getProducts = localStorage.getItem('cartItems');

            setProducts(JSON.parse(getProducts));
           
        } catch (error) {
            console.error('Error loading cart data:', error);
            toast.error('Failed to load cart data');
        } finally {
            setLoading(false);
        }
    };

   

    const updateQuantity = async (purchaseId, newQuantity) => {
        if (newQuantity < 1) return;
        
        const purchase = purchases.find(p => p.id === purchaseId);
        const product = products[purchase.product_id];
        
        if (!product) return;

        const newTotalPrice = product.price * newQuantity;
        
        await updateCartItem(purchaseId, {
            quantity: newQuantity,
            total_price: newTotalPrice
        });
    };

    const handleRemoveItem = async (purchaseId) => {
        if (window.confirm('Are you sure you want to remove this item from your cart?')) {
            await removeFromCart(purchaseId);
        }
    };

    const calculateSubtotal = () => {
        return purchases.reduce((total, purchase) => {
            const product = products[purchase.product_id];
            if (product) {
                return total + (product.price * purchase.quantity);
            }
            return total;
        }, 0);
    };

    const calculateTotal = () => {
        const subtotal = calculateSubtotal();
        const tax = subtotal * 0.08; // 8% tax
        const shipping = subtotal > 100 ? 0 : 15; // Free shipping over $100
        return subtotal + tax + shipping;
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    };

    const handleCheckout = async () => {
        try {
            // Update all purchases to 'completed' status
            const checkoutPromises = purchases.map(purchase => 
                updateCartItem(purchase.id, { status: 'completed' })
            );
            
            await Promise.all(checkoutPromises);
            toast.success('Order placed successfully!');
            navigate('/orders');
        } catch (error) {
            console.error('Checkout error:', error);
            toast.error('Failed to complete checkout');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-8 w-48"></div>
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-4">
                                <div className="flex gap-4">
                                    <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                    <div className="flex-1">
                                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-3/4"></div>
                                        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (purchases.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <ShoppingBag className="w-24 h-24 text-gray-400 mx-auto mb-8" />
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        Your Cart is Empty
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 mb-8">
                        Looks like you haven't added any items to your cart yet.
                    </p>
                    <Link
                        to="/"
                        className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Shopping Cart ({cartCount} items)
                    </h1>
                    <Link
                        to="/"
                        className="text-amber-600 hover:text-amber-700 font-medium flex items-center gap-2"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Continue Shopping
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        <div className="space-y-4">
                            {purchases.map((purchase) => {
                                const product = products[purchase.product_id];
                                if (!product) return null;

                                return (
                                    <motion.div
                                        key={purchase.id}
                                        className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        <div className="flex gap-4">
                                            {/* Product Image */}
                                            <img
                                                src={product.image_url || '/placeholder-furniture.jpg'}
                                                alt={product.name}
                                                className="w-24 h-24 object-cover rounded-lg"
                                            />

                                            {/* Product Details */}
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                                    {product.name}
                                                </h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                                                    {product.category}
                                                </p>
                                                <p className="text-lg font-bold text-gray-900 dark:text-white">
                                                    {formatPrice(product.price)}
                                                </p>
                                            </div>

                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                                                    <button
                                                        onClick={() => updateQuantity(purchase.id, purchase.quantity - 1)}
                                                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                                        disabled={purchase.quantity <= 1}
                                                    >
                                                        <Minus className="w-4 h-4" />
                                                    </button>
                                                    <span className="px-4 py-2 font-medium text-gray-900 dark:text-white">
                                                        {purchase.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(purchase.id, purchase.quantity + 1)}
                                                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                    </button>
                                                </div>

                                                <button
                                                    onClick={() => handleRemoveItem(purchase.id)}
                                                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-8">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                                Order Summary
                            </h2>

                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
                                    <span className="font-medium text-gray-900 dark:text-white">
                                        {formatPrice(calculateSubtotal())}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-300">Tax (8%)</span>
                                    <span className="font-medium text-gray-900 dark:text-white">
                                        {formatPrice(calculateSubtotal() * 0.08)}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-300">Shipping</span>
                                    <span className="font-medium text-gray-900 dark:text-white">
                                        {calculateSubtotal() > 100 ? 'Free' : formatPrice(15)}
                                    </span>
                                </div>

                                <hr className="border-gray-200 dark:border-gray-700" />

                                <div className="flex justify-between text-lg font-bold">
                                    <span className="text-gray-900 dark:text-white">Total</span>
                                    <span className="text-gray-900 dark:text-white">
                                        {formatPrice(calculateTotal())}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={handleCheckout}
                                className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 px-6 rounded-lg font-medium mt-6 transition-colors"
                            >
                                Proceed to Checkout
                            </button>

                            <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-4">
                                Free shipping on orders over $100
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;