import React, { useEffect, useState } from 'react';

import HeroBanner from './HeroBanner';
import Product from './Product';
import Footer from './Footer';
import { client } from '../client';
import { productQuery, bannerQuery } from '../utils/data';
import FooterBanner from './FooterBanner';

const Homepage = () => {
  const [bannerData, setBannerData] = useState({});
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    client.fetch(productQuery).then((data) =>
      setProductData(data)
    )
    client.fetch(bannerQuery).then((data) => setBannerData(data[0]))
  }, []);

  console.log(productData)
  return (
    <div>
      <HeroBanner
        smallText={bannerData?.smallText}
        midText={bannerData?.midText}
        largeText={bannerData?.largeText}
        image={bannerData?.image}
        buttonText={bannerData?.buttonText}
        descr={bannerData?.descr}
      />
      <div className="products-heading">
        <h2>Best selling products</h2>
        <p>Speakers of many variation</p>
      </div>
      <div className="products-container">
        {
          productData?.map((item) => <Product key={item.id} slug={item.slug} name={item.name} image={item.image} price={item.price} />)
        }
      </div>
      <FooterBanner footerBanner={bannerData}/>
      <Footer/>
    </div>
  )
}

export default Homepage