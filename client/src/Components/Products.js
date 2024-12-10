import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import ProductServices from '../Services/ProductServices';

export default function Products({category, setCurrentProduct}) {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    ProductServices.getProducts(category)
     .then(res => {
        setProducts(res.data);
     })
     .catch(e => {
        console.log(e);
     })
  }, [category])

  function SetProduct(product) {
    setCurrentProduct(product);
  }

  const productList = products.map(
    (product) => {
        return(
            <Link to='/Product' key={product.product}>
                <div onClick={() => {SetProduct(product.product)}} className='productListItem'>
                    <div className='productListImgContainer'>
                        <span className='imgVerticalAlign'></span>
                        <img src={product.image} alt='' className='productListImg' />
                    </div>
                    <h3 className='productListPrice'>${product.price}</h3>
                    <h2 className='productListName'>{product.product}</h2>
                </div>
            </Link>
        )
    }
  )

  return (
    <div className='productListContainer'>
      {productList}
    </div>
  )
}
