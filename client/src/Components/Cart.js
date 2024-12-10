import React from 'react'
import { Link } from 'react-router-dom'

export default function Cart({cartItems, setCartItems, setIsCartOpen}) {

  function RemoveFromCart(id) {
    setCartItems(cartItems.filter(cartItems => cartItems.id !== id))
  }

  const cartList = cartItems.map(
    (product) => {
        return(
            <div key={product.id} className='cartItemContainer'>
                <div className='cartImgContainer'>
                    <span className='imgVerticalAlign'></span>
                    <img src={product.image} alt='' className='cartItemImg' />
                </div>
                <div>
                    <h4 className='cartItemDetails'>{product.product}</h4>
                    {product.size !== undefined &&
                        <p className='cartItemDetails'>{product.size}</p>
                    }
                    <p className='cartItemDetails'>Quantity: {product.quantity}</p>
                    <h4 className='cartItemDetails'>${product.price * product.quantity}</h4>
                </div>
                <div className='cartImgContainer'>
                    <span className='imgVerticalAlign'></span>
                    <button onClick={() => RemoveFromCart(product.id)} className='cartRemoveBtn'>REMOVE</button>
                </div>
            </div>
        )
    }
  )

  return (
    <div className='cartContainer'>
          <div id='cartDiv'>
            <div className='cartTopBar'>
              <h1 className='cartHeading'>SHOPPING CART</h1>
              <button onClick={() => setIsCartOpen(false)} className='closeCartBtn'>X</button>
            </div>
            <div className='cartItemsArea'>
                {cartItems.length < 1 &&
                  <div className='checkoutBtn'>
                    <h4 className='cartItemDetails'>Cart is empty</h4>
                  </div>
                }
                {cartItems.length > 0 &&
                    <>
                        {cartList}
                        <div className='checkoutBtn'>
                          <Link to='/Checkout'>
                              <button className='addToCartBtn'>CHECKOUT</button>
                          </Link>
                        </div>
                    </>
                }
            </div>
          </div>
    </div>
  )
}
