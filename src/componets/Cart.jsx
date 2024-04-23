import React from 'react';
import {AiOutlineMinus, AiOutlinePlus, AiOutlineShopping, AiOutlineRight} from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti'

import { useStateContext } from '../context/StateContext';
import { urlFor } from '../client';

const Cart = () => {
  const { setShowCart, cartItems } = useStateContext();

  
  return (
    <div className='cart-wrapper'>
      <div className="cart-container">
        <button type="button" className='cart-heading' onClick={() => setShowCart(false)}>
          <AiOutlineRight/>
          <span className='heading'>Your Cart</span>
          <span className="cart-num-items">3</span>
        </button>
		{
			cartItems < 1 && 
			<div className="empty-cart">
				<AiOutlineShopping/>
				<h3>Your shopping bag is empty</h3>
				<button type="button" className='btn'>
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
              {/* <div className="flex bottom">
                <div>
                  <p className="quantity-desc">
                  <span className="minus" onClick={decQty}>
                    <AiOutlineMinus/>
                  </span>
                  <span className="num">{qty}</span>
                  <span className="plus" onClick={icQty}>
                    <AiOutlinePlus/>
                  </span>
                  </p>
                </div>
                <button type="button" className='remove-item'>
                  <TiDeleteOutline/>
                </button>
              </div> */}
            </div>
          </div>
            ))
          }
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal: </h3>
              <h3>$700</h3>
            </div>
            <div className="cart btn-container">
              <button className='btn' type="button">Pay with Stripe</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart