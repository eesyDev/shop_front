import React from 'react';
import { AiOutlineTwitter, AiFillInstagram } from 'react-icons/ai'

const Footer = () => {
  return (
    <div  className='footer-container'>
      <p>2024 Technoshop GSM all rights reserved</p>
      <div className="icons">
        <AiFillInstagram/> <AiOutlineTwitter/>
      </div>
    </div>
  )
}

export default Footer