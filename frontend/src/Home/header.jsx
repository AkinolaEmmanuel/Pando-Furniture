import { ShoppingCart, User } from 'lucide-react'
import { useAuth } from '../../contexts/authcontext'
import { Link } from 'react-router-dom';

const Header = () => {

  const { login } = useAuth();
  return (
    <div className="py-4 px-8 flex justify-between items-center w-full">
        <h1 className="text-2xl font-bold">Pando</h1>
        <div className="flex items-center gap-5">
          <ShoppingCart/>
          {login ? 
          <User/> : 
          <Link to={'/login'}>
          <button className='bg-amber-400 text-white py-2 px-4 rounded-sm'>Login</button>
          </Link>}
        </div>
    </div>
  )
}

export default Header