import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AiFillStar, AiOutlineStar, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

import { client, urlFor } from '../client';
import { useStateContext } from '../context/StateContext';
import Product from './Product';

const ProductDetail = () => {
  const { slug } = useParams();
  const [imgIndex, setImgIndex] = useState(0)
  const [productDetail, setProductDetail] = useState({});
  const [likeProduct, setLikeProduct] = useState([]);
  const query = `*[_type == "product" && slug.current == "${slug}"][0]`;
  const query_like = `*[_type == "product"]`;


  const { qty, setQty, icQty, decQty, onAdd, setShowCart, cartItems, totalPrice, totalQuantities } = useStateContext();

  useEffect(() => {
    client.fetch(query).then((data) => {
      setProductDetail(data)
    });
    client.fetch(query_like).then((data) => {
      setLikeProduct(data)
    });
  }, []);


  const handleBuyNow = () => {
    onAdd(productDetail, qty);
    setShowCart(true)
  }

  const { image, name, details, price, _id } = productDetail;

  return (
    <div>
      <div className="product-detail-container">
        <div  className='image-gallery'>
          <div className="image-container">
            {image && <img src={urlFor(image && image[imgIndex])} className="product-detail-image" />}
          </div>
          <div className='small-images-container'>
            {/* {
              image && image?.map((img, index) => 
                <img key={index} src={urlFor(img)} className={index === imgIndex ? 'selected-image small-image' : 'small-image'} onMouseEnter={() => setImgIndex(index)} />

              )
            } */}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar/>
              <AiFillStar/>
              <AiFillStar/>
              <AiFillStar/>
              <AiOutlineStar/>
            </div>
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity</h3>
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
          <div className="buttons">
            <button className='add-to-cart btn' onClick={() => onAdd(productDetail, qty)}>Add to cart</button>
            <button className='buy-now btn' onClick={handleBuyNow}>Buy Now</button>
          </div>
        </div>
      </div>
      <div className="maylike-products-wrapper">
            <h2>You may also like</h2>
            <div className="marquee">
              <div className="maylike-products-container track">
                {
                  likeProduct && likeProduct?.filter((item) => item._id !== _id).map((product) => (
                    <Product key={product?._id} name={product?.name} image={product?.image} price={product?.price} slug={product?.slug}/>
                  ))
                }
              </div>
          </div>
      </div>
    </div>
  )
}

export default ProductDetail