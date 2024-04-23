import React from 'react';
import { AiOutlineShopping } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Cart from './Cart';
import { useStateContext } from '../context/StateContext';

const Navbar = () => {
    const { showCart, setShowCart } = useStateContext(); 

    console.log(showCart)
  return (
    <div className='navbar-container'>
        <p>
            <Link to='/'>Technoshop GSM</Link>
        </p>
        <button type="button" onClick={() => setShowCart(true)} className='cart-icon'>
            <AiOutlineShopping/>
            <span className='cart-item-qty'>3</span>
        </button>

        { showCart && <Cart /> }
    </div>
  )
}

export default Navbar