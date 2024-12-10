import React, { useState } from 'react'
import AccountUpdate from './AccountUpdate';
import AccountDelete from './AccountDelete';
import PasswordChange from './PasswordChange';

export default function AccountDetails({user, setUser}) {

  const [updatingAccountDetails, setUpdatingAccountDetails] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [deletingAccount, setDeletingAccount] = useState(false);

  let orderHistory;

  if(user !== ""){
    orderHistory = user.map(
        (userDetails) => {
            const orders = userDetails.orders.map(
                (order) => {

                    let totalPrice = 0;
                    let orderDate = new Date(order.purchaseDate);

                    const products = order.products.map(
                        (product) => {
                            totalPrice += product.price * product.quantity;
                            return(
                                <div key={crypto.randomUUID}>
                                    <p className='productDetailsText'>{product.product}</p>
                                    <p className='productDetailsText'>Quantity: {product.quantity}</p>
                                    <p className='productDetailsText'>Price per item: ${product.price}</p>
                                    <hr></hr>
                                </div>
                            )
                        }
                    )

                    return(
                        <div className='orderHistoryDiv' key={order.orderNumber}>
                            <div className='orderHistoryHeader'>
                                <p className='productDetailsText'>Order Number: {order.orderNumber}</p>
                                <p className='productDetailsText'>Purchase Date: {orderDate.toDateString()}</p>
                            </div>
                            {products}
                            <p className='productDetailsText'><b>Total Price: ${totalPrice}</b></p>                            
                        </div>
                    )
                }
            )

            if(userDetails.orders.length === 0) {
                return(
                    <div>
                        <hr></hr>
                        <div className='noOrdersText'>No orders made</div>
                    </div>
                )
            }

            return(
                <div key={crypto.randomUUID}>{orders}</div>
            )
        }
    )
  }

  return (
    <div>
        <div className='loginContainer'>            
            {updatingAccountDetails === false && changingPassword === false && deletingAccount === false &&
                <>
                    <div className='loginDiv'>
                        <div className='loginTitle'>Account Details</div>
                    </div>
                    <div className='loginInputDiv'>
                        <p className='accountDetailsText'><b>Email:</b> {user[0].email}</p>
                        <p className='accountDetailsText'><b>Phone Number:</b> {user[0].phoneNumber}</p>
                        <p className='accountDetailsText'><b>Name:</b> {user[0].firstName} {user[0].lastName}</p>
                        <div className='accountBtnContainer'>
                            <button onClick={() => setUpdatingAccountDetails(true)} className='accountBtn'>Change Details</button>
                            <button onClick={() => setChangingPassword(true)} className='accountBtn'>Change Password</button>
                        </div>
                        <button onClick={() => setDeletingAccount(true)} className='accountDeleteBtn'>CLOSE ACCOUNT</button>
                    </div>
                </>
            }
            {updatingAccountDetails === true &&
                <AccountUpdate user={user} setUpdatingAccountDetails={setUpdatingAccountDetails}/>
            }
            {changingPassword === true &&
                <PasswordChange user={user} setChangingPassword={setChangingPassword}/>
            }
            {deletingAccount === true &&
                <AccountDelete user={user} setUser={setUser} setDeletingAccount={setDeletingAccount}/>
            }
        </div>
        <div className='orderHistoryContainer'>
            <h2 className='orderHistoryTitle'>Order History</h2>
            {orderHistory}
        </div>
      </div>
  )
}
