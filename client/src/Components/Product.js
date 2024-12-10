import React from 'react';
import { useState, useEffect, useRef } from 'react';
import ProductServices from '../Services/ProductServices';

export default function Product({currentProduct, setCartItems, setIsCartOpen}) {

  const [product, setProduct] = useState([]);
  const quantityRef = useRef();
  const sizeRef = useRef();

  useEffect(() => {
    ProductServices.getProduct(currentProduct)
        .then(res => {
            setProduct(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
  }, [currentProduct])

  function AddToCart(product, price, image, category) {
    const quantity = quantityRef.current.value;
    let size;
    if(category !== "skateboards") {
      size = sizeRef.current.value;
    }

    if(quantity === "") {
      alert("Please enter a quantity");
      return;
    }

    if(quantity.includes(".")) {
      alert("Quantity must be a whole number");
      return;
    }

    if(quantity < 1) {
      alert("Quantity must be greater than 0");
      return;
    }

    if(category === "skateboards") {
      setCartItems(prevItems => {
        return [...prevItems, { id: crypto.randomUUID(), product: product, price: price, image: image, quantity: quantity }]
      })
    }
    else {
      setCartItems(prevItems => {
        return [...prevItems, { id: crypto.randomUUID(), product: product, price: price, image: image, quantity: quantity, size: size }]
      })
    }

    setIsCartOpen(true);
  }

  const productView = product.map(
    (product) => {
        return(
            <div key="currentProductView" className='productViewContainer'>
              <div className='productViewColumns'>
                <div className='productViewImgContainer'>
                  <span className='imgVerticalAlign'></span>
                  <img src={product.image} className='productViewImg' alt="" />
                </div>
                <div className='productDetailsContainer'>
                  <div>
                    <h1 className='productHeading'>{product.product}</h1>
                    <h4 className='productDetailsText'>Description:</h4>
                    <p className='productDetailsText'>{product.description}</p>
                  </div>
                  <div>
                    <h3 className='productViewPrice'>Price: ${product.price}</h3>
                    {product.category === "clothing" &&
                        <>
                            <label className='productDetailsText'>Size:</label>
                            <br></br>
                            <select ref={sizeRef}>
                            <option value='Small'>Small</option>
                            <option value='Medium'>Medium</option>
                            <option value='Large'>Large</option>
                            </select>
                        </>
                    }
                    {product.category === "shoes" &&
                        <>
                            <label className='productDetailsText'>Size:</label>
                            <br></br>
                            <select ref={sizeRef}>
                            <option value='8'>8</option>
                            <option value='9'>9</option>
                            <option value='10'>10</option>
                            <option value='11'>11</option>
                            <option value='12'>12</option>
                            </select>
                        </>
                    }
                    <br></br>
                    <label className='productDetailsText'>Quantity:</label>
                    <br></br>
                    <input ref={quantityRef} type='number' min='1' defaultValue='1' />
                    <br></br>
                    <br></br>
                    <button onClick={() => AddToCart(product.product, product.price, product.image, product.category)} className='addToCartBtn'>ADD TO CART</button>
                  </div>
                </div>
              </div>
            </div>
        )
    }
  )

  return (
    <div>
      {productView}
    </div>
  )
}
