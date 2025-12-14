import { useState, useEffect } from 'react'
import SimpleSlider from '../../components/carousel';
import { motion } from 'framer-motion';
import { useApi } from '../../hooks/useApi.js';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


const RegisterAuth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const { loading: RegisterLoading, error: RegisterError, success: RegisterSuccess, callApi } = useApi('users/register', 'POST', { username, email, password, role: 'user' });
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        callApi();
    }

    useEffect(() => {
        if (RegisterSuccess) {
            toast.success('Registration successful');
            navigate('/login');
        }
    }, [RegisterSuccess, navigate]);

  return (
    <>
        <div className="flex flex-col md:flex-row items-center justify-center overflow-hidden w-full h-screen 2xl:h-full">
            <div className="p-5">
                <div className="flex items-center justify-center w-full h-full">
                    <motion.form
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        onSubmit={handleSubmit}
                        className="flex flex-col items-center justify-center lg:gap-5 w-full h-full max-w-lg"
                    >
                                <h1 className="text-4xl font-bold my-5">Sign up to <span className='text-amber-500'>Pando Furniture<span className='text-amber-800 animate-ping'>.</span></span></h1>
                                <div className="max-w-sm">
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full px-4 py-2 my-4 border-b outline-none"
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-2 my-4 border-b outline-none"
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-2 my-4 border-b outline-none"
                                />
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-4 py-2 my-4 border-b outline-none"
                                />
                                </div>
                                {RegisterError && <p className="text-red-500">{RegisterError.message || 'Something went wrong'}</p>}
                                <button
                                    type="submit"
                                    className="w-full max-w-xs px-4 py-2 my-4 bg-amber-600 text-white rounded-md"
                                >
                                    {RegisterLoading ? (
                                        'Registering...'
                                    ): (
                                        'Register'
                                    )
                                    }
                                </button>
                                <p className="text-center text-sm">
                                    Already have an account?{' '}
                                    <Link to="/login">
                                    <button
                                        type="button"
                                        className="text-blue-500 hover:underline"
                                    >
                                        Login
                                    </button>
                                    </Link>
                                </p>
                         
                    </motion.form>
                </div>
            </div>
            {/* <div className="w-full md:w-1/2 hidden md:block"> 
                <SimpleSlider/>
            </div> */}
        </div>
      
    </>
  )
}

export default RegisterAuth;
