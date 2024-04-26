import React, { useEffect } from 'react';
import { BsBagCheckFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

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
            <Link to='/' type="button" className='btn'>
                Continue shopping
            </Link>
        </div>
    </div>
  )
}

export default Success