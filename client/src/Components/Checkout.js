import React, { useState, useRef, useEffect } from 'react';
import accountService from '../Services/AccountServices';

export default function Checkout({cartItems, setCartItems, setIsCartOpen, user}) {

  const [contactDetails, setContactDetails] = useState([]);
  const [deliveryDetails, setDeliveryDetails] = useState([]);
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState();
  const [paymentAmount, setPaymentAmount] = useState();
  const [gst, setGst] = useState();
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paid, setPaid] = useState(false);
  const firstName = useRef();
  const lastName = useRef();
  const contactNum = useRef();
  const emailAddress = useRef();
  const delivNum = useRef();
  const delivStreet = useRef();
  const delivSuburb = useRef();
  const delivCity = useRef();
  const delivPostcode = useRef();

  

  useEffect(() => {
    let newTotal = 0

    for(let i = 0; i < cartItems.length; i++) {
        newTotal += cartItems[i].price * cartItems[i].quantity;
    }

    setTotalPrice(newTotal);
  }, [cartItems])

  useEffect(() => {
    if(user !== "") {
      firstName.current.value = user[0].firstName;
      lastName.current.value = user[0].lastName;
      contactNum.current.value = user[0].phoneNumber;
      emailAddress.current.value = user[0].email;
    }
    setIsCartOpen(false);
  }, [user, setIsCartOpen])

  function RemoveFromCart(id) {
    setCartItems(cartItems.filter(cartItems => cartItems.id !== id));
  }

  function ConfirmPayment() {

    if(cartItems.length < 1) {
      alert("You must have at least one product in your cart to make a purchase");
      return;
    }

    const fName = firstName.current.value;
    const lName = lastName.current.value;
    const contactNumber = contactNum.current.value;
    const email = emailAddress.current.value;
    const streetNumber = delivNum.current.value;
    const streetName = delivStreet.current.value;
    const suburb = delivSuburb.current.value;
    const city = delivCity.current.value;
    const postcode = delivPostcode.current.value;

    if(user !== ""){
      const order = {
        orderNumber: user[0].orders.length+1,
        purchaseDate: new Date(),
        products: []
      }
  
      for(let i = 0; i < cartItems.length; i++) {
        const product = {
          product: cartItems[i].product,
          quantity: cartItems[i].quantity,
          price: cartItems[i].price
        }
        order.products.push(product);
      }

      user[0].orders.push(order);

      accountService.putOrder(order, user[0].email)
      .then((res) =>{
        if(res.data === "success") {
          console.log("order saved");
        } else {
          console.log("error saving order to account");
        }
      })
      .catch((err) => {
        console.log(err);
      })
    }

    setContactDetails([{ firstName: fName, lastName: lName, phone: contactNumber, email: email }]);
    setDeliveryDetails([{ number: streetNumber, street: streetName, suburb: suburb, city: city, postcode: postcode }]);
    setCheckoutItems([...cartItems]);
    setPaymentAmount(totalPrice);
    setGst(totalPrice * 0.15);
    setCartItems([]);
    setProcessingPayment(true);
    setTimeout(DisplayReceipt, 3000);
  }

  function DisplayReceipt() {
    setProcessingPayment(false);
    setPaid(true);
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
              <>
                <p className='cartItemDetails'>Size: {product.size}</p>
              </>
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

  const contactInfo = contactDetails.map(
    (contact) => {
      return(
        <div key='contactInfo'>
          <h4 className='cartItemDetails'>A receipt has been sent to: {contact.email}</h4>
          <p>Name: {contact.firstName} {contact.lastName}</p>
          <p>Contact Number: {contact.phone}</p>
        </div>
      )
    }
  )

  const deliveryInfo = deliveryDetails.map(
    (delivery) => {
      return(
        <div key='delivInfo'>
          <h4 className='cartItemDetails'>Deliver To</h4>
          <p>{delivery.number} {delivery.street}, {delivery.suburb}</p>
          <p>{delivery.city}</p>
          <p>{delivery.postcode}</p>
        </div>
      )
    }
  )

  const purchasedItems = checkoutItems.map(
    (product) => {
      return(
        <div key={product.id}>
          <p>{product.product}</p>
          {product.size !== undefined &&
            <>
              <p>Size: {product.size}</p>
            </>
          }
          <p>Quantity: {product.quantity}</p>
          <p>${product.price * product.quantity}</p>
          <hr></hr>
        </div>
      )
    }
  )

  if(processingPayment) {
    return(
      <div className='loadingImgContainer'>
        <img src='images/LoadingImage.png' alt='' className='loadingImg rotate' />
        <h1 className='loadingText'>Processing Payment...</h1>
      </div>
    )
  }

  if(paid) {
    return(
      <div className='checkoutContainer'>
        <br></br>
        <h3 className='cartHeading'>Thankyou for your purchase!</h3>
        {contactInfo}
        {deliveryInfo}
        <h3 className='cartItemDetails'>Purchased Products</h3>
        <hr></hr>
        {purchasedItems}
        <h4 className='cartItemDetails'>GST paid: ${gst}</h4>
        <h4 className='cartItemDetails'>Total amount paid: ${paymentAmount}</h4>
      </div>
    )
  }

  return (
    <div className='checkoutContainer'>
      <h1 className='checkoutHeading'>CHECKOUT</h1>
      <h4 className='cartHeading'>Contact Details</h4>
      <div className='purchaseDetails'>
        <label>First Name:</label>
        <input type='text' ref={firstName} defaultValue='John'></input>
        <label>Last Name:</label>
        <input type='text' ref={lastName} defaultValue='Doe'></input>
        <label>Contact Number:</label>
        <input type='text' ref={contactNum} defaultValue='0211234567'></input>
        <label>Email:</label>
        <input type='text' ref={emailAddress} defaultValue='johndoe@gmail.com'></input>
      </div>
      <hr></hr>
      <h4 className='cartHeading'>Delivery Details</h4>
      <div className='purchaseDetails'>
        <label>Street Number:</label>
        <input type='text' ref={delivNum} defaultValue='99'></input>
        <label>Street Name:</label>
        <input type='text' ref={delivStreet} defaultValue='Test Street'></input>
        <label>Suburb:</label>
        <input type='text' ref={delivSuburb} defaultValue='Testville'></input>
        <label>City:</label>
        <input type='text' ref={delivCity} defaultValue='Testington'></input>
        <label>Postcode:</label>
        <input type='text' ref={delivPostcode} defaultValue='4321'></input>
      </div>
      <hr></hr>
      <h4 className='cartHeading'>Card Details</h4>
      <div className='purchaseDetails'>
        <label>Name on Card:</label>
        <input type='text' defaultValue='John Doe'></input>
        <label>Card Number:</label>
        <input type='text' defaultValue='0000-0000-0000-0000'></input>
        <label>Expiry Date:</label>
        <input type='text' defaultValue='MM/YY'></input>
        <label>CVV:</label>
        <input type='text' defaultValue='123'></input>
      </div>
      <hr></hr>
      <h4 className='cartHeading'>Products</h4>
      {cartList}
      <br></br>
      <h4 className='cartHeading'>Total Price: ${totalPrice}</h4>
      <button onClick={ConfirmPayment} className='addToCartBtn'>CONFIRM PAYMENT</button>
    </div>
  )
}
