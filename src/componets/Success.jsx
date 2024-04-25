import React, { useEffect } from 'react';
import { BsBagCheckFill } from 'react-icons/bs';

import { runFireworks } from '../utils/data';

const Success = () => {
    useEffect(() => {
        runFireworks();
    }, [])
  return (
    <div className='success-wrapper'>
        <div className="success">
            <BsBagCheckFill/>
            <h2>Your order has been placed</h2>
            <p className='email-msg'>Check your email inbox for the receipt</p>
            <button type="button" className='btn'>
                Continue shopping
            </button>
        </div>
    </div>
  )
}

export default Success