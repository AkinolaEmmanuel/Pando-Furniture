import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Context Providers
import { AuthProvider } from '../contexts/authcontext';
import { ThemeProvider } from '../contexts/themecontext';
import { CartProvider } from '../contexts/cartcontext';

// Components
import LandingPage from './Home/page';
import LoginPage from './Login/page'; 
import RegisterAuth from './Register/page';
import CartPage from './Carts/page'; 
// import ProfilePage from './components/ProfilePage'; // You'll need to create this
// import OrdersPage from './components/OrdersPage'; // You'll need to create this

function App() {
    return (
      <Router>
        <ThemeProvider>
            <AuthProvider>
                <CartProvider>
                        <div>
                            <Routes>
                                <Route path="/" element={<LandingPage />} />
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/register" element={<RegisterAuth />} />
                                <Route path="/cart" element={<CartPage />} />
                                {/* 
                                <Route path="/profile" element={<ProfilePage />} />
                                <Route path="/orders" element={<OrdersPage />} /> */}
                            </Routes>
                            
                            {/* Toast Notifications */}
                            <Toaster
                                position="top-right"
                                toastOptions={{
                                    duration: 4000,
                                    style: {
                                        background: 'var(--toast-bg)',
                                        color: 'var(--toast-color)',
                                    },
                                }}
                            />
                        </div>
                </CartProvider>
            </AuthProvider>
        </ThemeProvider>
        </Router>
    );
}

export default App;