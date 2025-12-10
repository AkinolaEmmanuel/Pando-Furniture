import { createContext, useContext, useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import toast from 'react-hot-toast';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [purchases, setPurchases] = useState([]);
    
    // const { callApi: createPurchaseApi } = useApi('purchases', 'POST');
    // const { callApi: getPurchasesApi } = useApi('purchases', 'GET');
    // const { callApi: updatePurchaseApi } = useApi('purchases', 'PUT');
    // const { callApi: deletePurchaseApi } = useApi('purchases', 'DELETE');

    // Load user's purchases on mount
    useEffect(() => {
        loadUserPurchases();
    }, []);

    const loadUserPurchases = async () => {
        const userId = getCookie('userId');
        if (userId) {
            try {
                const { callApi } = useApi(`purchases/user/${userId}`, 'GET');
                const response = await callApi();
                if (response?.data) {
                    setPurchases(response.data);
                    setCartCount(response.data.length);
                }
            } catch (error) {
                console.error('Error loading purchases:', error);
            }
        }
    };

    const addToCart = async (product) => {
        const userId = getCookie('userId');
        if (!userId) {
            toast.error('Please login to add items to cart');
            return;
        }

        try {
            const purchaseData = {
                user_id: userId,
                product_id: product.id,
                quantity: 1,
                status: 'pending',
                total_price: product.price
            };

            const { callApi } = useApi('purchases', 'POST', purchaseData);
            const response = await callApi();
            
            if (response?.data) {
                setPurchases(prev => [...prev, response.data]);
                setCartCount(prev => prev + 1);
                toast.success('Item added to cart!');
            }
        } catch (error) {
            toast.error('Failed to add item to cart');
            console.error('Error adding to cart:', error);
        }
    };

    const removeFromCart = async (purchaseId) => {
        try {
            const { callApi } = useApi(`purchases/${purchaseId}`, 'DELETE');
            await callApi();
            
            setPurchases(prev => prev.filter(purchase => purchase.id !== purchaseId));
            setCartCount(prev => prev - 1);
            toast.success('Item removed from cart');
        } catch (error) {
            toast.error('Failed to remove item from cart');
            console.error('Error removing from cart:', error);
        }
    };

    const updateCartItem = async (purchaseId, updateData) => {
        try {
            const { callApi } = useApi(`purchases/${purchaseId}`, 'PUT', updateData);
            const response = await callApi();
            
            if (response?.data) {
                setPurchases(prev => 
                    prev.map(purchase => 
                        purchase.id === purchaseId ? response.data : purchase
                    )
                );
                toast.success('Cart updated');
            }
        } catch (error) {
            toast.error('Failed to update cart item');
            console.error('Error updating cart item:', error);
        }
    };

    const clearCart = async () => {
        const userId = getCookie('userId');
        if (!userId) return;

        try {
            // Delete all pending purchases for user
            for (const purchase of purchases) {
                if (purchase.status === 'pending') {
                    await removeFromCart(purchase.id);
                }
            }
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    };

    // Helper function to get cookie
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    };

    const value = {
        cartItems,
        cartCount,
        purchases,
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCart,
        loadUserPurchases
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};