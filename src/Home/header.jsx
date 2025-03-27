import { ShoppingCart } from 'lucide-react'
import React from 'react'

const Header = () => {
  return (
    <div className="py-4 px-8 flex justify-between items-center w-full">
        <h1 className="text-2xl font-bold">Panto</h1>
        <div className="">
          <ul className='flex items-center justify-around'>
            <li>Furniture</li>
            <li>Shop</li>
            <li>About Us</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className="">
          <ShoppingCart/>
        </div>
    </div>
  )
}

export default Header