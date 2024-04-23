import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AiFillStar, AiOutlineStar, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

import { client, urlFor } from '../client';
import { useStateContext } from '../context/StateContext';

const ProductDetail = () => {
  const { slug } = useParams();
  const [imgIndex, setImgIndex] = useState(0)
  const [productDetail, setProductDetail] = useState({})
  const query = `*[_type == "product" && slug.current == "${slug}"][0]`;

  const { qty, setQty, icQty, decQty, onAdd } = useStateContext()

  useEffect(() => {
    client.fetch(query).then((data) => {
      setProductDetail(data)
    })
  }, []);

  const { image, name, details, price } = productDetail;

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            {image && <img src={urlFor(image && image[imgIndex])} className="product-detail-image" />}
          </div>
          <div className='small-images-container'>
            {
              image && image?.map((img, index) => 
                <img key={index} src={urlFor(img)} className={index === imgIndex ? 'selected-image small-image' : 'small-image'}
                  onMouseEnter={() => setImgIndex(index)}
                />
              )
            }
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
            <button className='buy-now btn'>Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail