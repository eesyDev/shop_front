import React from 'react';
import {AiOutlineMinus, AiOutlinePlus, AiOutlineShopping, AiOutlineRight} from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import { toast } from 'react-hot-toast';


import { useStateContext } from '../context/StateContext';
import { urlFor } from '../client';
import getStripe from '../stripe';

const Cart = () => {
  const { setShowCart, cartItems, totalPrice, totalQuantities, toggleCartItemQuantity, onRemove } = useStateContext();

  const handleCheckout = async () => {
    try {
      const stripe = await getStripe();

      const response = await fetch('http://localhost:5001/api/stripe', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({cartItems})
      });

      if (!response.ok) {
        // Handle non-OK responses (e.g., 500 Internal Server Error)
        console.error(`Error: ${response.status} - ${response.statusText}`);
        return;
      }

      const data = await response.json();

      console.log(data)
  
      toast.loading('Redirecting...');

      stripe.redirectToCheckout({ sessionId: data.id });
    } catch (err) {
      console.error('Error during checkout')
    }
  }
  
  return (
    <div className='cart-wrapper'>
      <div className="cart-container">
        <button type="button" className='cart-heading' onClick={() => setShowCart(false)}>
          <AiOutlineRight/>
          <span className='heading'>Your Cart</span>
          <span className="cart-num-items">{totalQuantities}</span>
        </button>
		{
			cartItems < 1 && 
			<div className="empty-cart">
				<AiOutlineShopping/>
				<h3>Your shopping bag is empty</h3>
				<button type="button" className='btn' onClick={() => setShowCart(false)}>
					Continue shopping
				</button>
			</div>
		}
        
        <div className="product-container">
          { cartItems.length >=1 &&
            cartItems?.map((product) => (
              <div className='product'>
            {product?.image && <img src={urlFor(product?.image[0])} className='cart-product-image'/>}
            <div className="item-desc">
              <div className="flex top">
                <h5>{product?.name}</h5>
                <h4>${product?.price}</h4>
              </div>
              <div className="flex bottom">
                <div>
                  <p className="quantity-desc">
                  <span className="minus" onClick={() => toggleCartItemQuantity(product?._id, 'dec')}>
                    <AiOutlineMinus/>
                  </span>
                  <span className="num">{product?.quantity}</span>
                  <span className="plus" onClick={() => toggleCartItemQuantity(product?._id, 'inc')}>
                    <AiOutlinePlus/>
                  </span>
                  </p>
                </div>
                <button type="button" className='remove-item' onClick={() => onRemove(product)}>
                  <TiDeleteOutline/>
                </button>
              </div>
            </div>
          </div>
            ))
          }
          {
            cartItems.length > 0 &&
            <div className="cart-bottom">
                <div className="total">
                  <h3>Subtotal: </h3>
                  <h3>${totalPrice}</h3>
                </div>
                <div className="cart btn-container">
                  <button className='btn' type="button" onClick={handleCheckout}>Pay with Stripe</button>
                </div>
            </div>
          }
          
        </div>
      </div>
    </div>
  )
}

export default Cart