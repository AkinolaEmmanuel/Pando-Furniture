import { Search, ShoppingCart, User, Sun, Moon, LogOut } from 'lucide-react'
import { useAuth } from '../../contexts/authcontext'
import { useTheme } from '../../contexts/themecontext'
import { useCart } from '../../contexts/cartcontext'
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react';

const Hero = () => {
   const { isLogged, user, logout } = useAuth();
   const { theme, toggleTheme } = useTheme();
   const { cartCount } = useCart();
   const [showUserMenu, setShowUserMenu] = useState(false);

   const handleLogout = () => {
     logout();
     setShowUserMenu(false);
   };

  return (
    <div className={`bg-[url(/bg.png)] bg-no-repeat bg-cover xl:bg-bottom w-full h-screen 2xl:min-h-full text-white transition-colors duration-300 `}>

      <div className="bg-[#00000080]/90 backdrop-blur-md0 h-full">
        <motion.div
         className="py-4 px-8 flex justify-between items-center w-full xl:max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold">Pando</h1>
        
        <div className="flex items-center gap-5">
          {/* Theme Toggle */}
          {/* <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button> */}

          {/* Cart Icon with Count */}
          <Link to="/cart" className="relative">
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* User Authentication */}
          {isLogged ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 hover:bg-white/10 p-2 rounded-lg transition-colors"
              >
                <User className="w-5 h-5" />
                <span className="hidden md:block">{user?.name || 'User'}</span>
              </button>
              
              {showUserMenu && (
                <div className="absolute right-0 top-full mt-2 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-lg py-2 min-w-[150px] z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => setShowUserMenu(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => setShowUserMenu(false)}
                  >
                    Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to={'/login'}>
              <button className='bg-orange-400 py-2 px-7 cursor-pointer shadow-xl rounded-xl transition-colors'>
                Sign In
              </button>
            </Link>
          )}
        </div>
      </motion.div>
        
      <AnimatePresence>
      <motion.div 
      initial={{opacity: 0, scale: 0.75, duration: 3}} 
      animate={{ opacity: 1, scale: 1}} 
      exit={{opacity: 0, scale: 0.75}}
      className="h-full w-full text-center flex flex-col items-center justify-center gap-5">
          <h1 className='text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold max-w-3xl shadow-lg'>Affordable Furniture For All.</h1>
          <p className='text-lg font-light'>Welcome to Pando Furniture, The Home of Minimalist and Modern House Furniture.</p>
          <div className="relative w-full max-w-2xs md:max-w-xs">
          <input 
            type="text" 
            placeholder='Search Furniture' 
            className='bg-white/10 border w-full outline-0 p-2 px-3 rounded-2xl backdrop-blur-sm' 
          />
          <div className="bg-[#E58411] p-[5px] rounded-full absolute top-2 right-2">
          <Search className="w-4 h-4"/>
          </div>
          </div>
      </motion.div>
      </AnimatePresence>
      </div>
    </div>
  )
}

export default Hero;