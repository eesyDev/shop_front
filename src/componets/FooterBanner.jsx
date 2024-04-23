import React from 'react';
import { Link } from 'react-router-dom';

import { urlFor } from '../client';

const FooterBanner = ({footerBanner : { discount, largeText, largeText2, saleTime, smallText, midText, descr, product, buttonText, image }}) => {
  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          <p>{discount}</p>
          <h3>{largeText}</h3>
          <h3>{largeText2}</h3>
          <p>{saleTime}</p>
        </div>
        <div className="right">
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{descr}</p>
          <Link href={`/product/${product}`}>
            <button type="button">{buttonText}</button>
          </Link>
        </div>

        {image && <img 
          src={urlFor(image)} className="footer-banner-image"
        />}
      </div>
    </div>
  )
}

export default FooterBanner