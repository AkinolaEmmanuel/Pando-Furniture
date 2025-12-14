import { useState, useEffect, use } from 'react'
import SimpleSlider from '../../components/carousel';
import { motion } from 'framer-motion';
import { useApi } from '../../hooks/useApi.js';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../contexts/authcontext';
import { EyeIcon, EyeOffIcon} from 'lucide-react';
const LoginAuth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [showPassword, setShowPassword] = useState(false);
    const [userData, setUserData] = useState(null);
    const { login } = useAuth();

    const { loading: LoginLoading, error: LoginError, success: LoginSuccess, callApi } = useApi('users/login', 'POST', { email, password, role });
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const response = callApi();
        response.then((data) => {
            setUserData(data);
        }).catch((err) => {
            console.error('Login failed:', err);
        })
    }

    useEffect(() => {
        if (LoginSuccess) {
             toast.success('Login successful');
            navigate('/');
            login(userData);
        }
    }, [LoginSuccess, navigate]);

  return (
    <>
        <div className="flex flex-col md:flex-row items-center justify-center overflow-hidden w-full h-screen 2xl:h-full">
            <div className="w-full p-5">
                <div className="flex items-center justify-center w-full h-full">
                    <motion.form
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center justify-center lg:gap-5 w-full h-full max-w-lg"
                        onSubmit={handleSubmit}
                    >
                                <h1 className="text-4xl font-bold my-5">Login to <span className='text-amber-500'>Pando Furniture<span className='text-amber-800 animate-ping'>.</span></span></h1>
                                <div className="max-w-sm">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-2 my-4 border-b outline-none"
                                />
                                <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-2 mb-4 border-b outline-none"
                                />
                                {showPassword ? (
                                    <EyeOffIcon onClick={() => setShowPassword(false)} className="absolute right-3 top-3 w-5 h-5 cursor-pointer"/>
                                ) : (
                                    <EyeIcon onClick={() => setShowPassword(true)} className="absolute right-3 top-3 w-5 h-5 cursor-pointer"/>
                                )}
                                </div>
                                {/* <select 
                                    value={role} 
                                    onChange={(e) => setRole(e.target.value)}
                                    placeholder='Enter your role'
                                    className="w-full px-4 py-2 mb-4 border-b outline-none">
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                    </select> */}
                                </div>
                                    {LoginError && <p className="text-red-500">{LoginError.message || 'Error logging in user'}</p>}
                                    <button
                                        type="submit"
                                        className="max-w-xs w-full px-4 py-2 mb-4 bg-amber-600 text-white rounded-md"
                                    >
                                        {LoginLoading ? (
                                            'Logging in...'
                                        ): (
                                            'Login'
                                        )
                                        }
                                        
                                    </button>
                             
                                <p className="text-center text-sm">
                                    Don't have an account?{' '}
                                    <Link to="/register">
                                    <button
                                        type="button"
                                        className="text-blue-500 hover:underline"
                                    >
                                        Register
                                    </button>
                                    </Link>
                                </p>
                        
                    </motion.form>
                </div>
            </div>
            <div className=""> 
               
            </div>
        </div>
      
    </>
  )
}

export default LoginAuth;
