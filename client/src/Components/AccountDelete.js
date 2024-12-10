import React, { useState, useRef } from 'react'
import accountService from '../Services/AccountServices';

export default function AccountDelete({user, setUser, setDeletingAccount}) {

  const [deletePassIncorrect, setDeletepassIncorrect] = useState(false);

  // Delete account input
  const deleteAccPass = useRef();

  // Delete Account Function
  function DeleteAccount() {
    setDeletepassIncorrect(false);

    const pass = deleteAccPass.current.value;

    accountService.deleteAccount(user[0].email, pass)
    .then((res) => {
        if(res.data === "account not found") {
            alert('Error deleting account');
        } else if(res.data === "incorrect password") {
            setDeletepassIncorrect(true);
        } else {
            if(res.data === "account deleted") {
                setDeletingAccount(false);
                alert('Account deleted');
                setUser("");
            } else {
                alert('Error deleting account');
            }
        }
    })
    .catch((err) => {
        console.log(err);
    })
  }

  return (
    <>
        <div className='loginDiv'>
            <div className='loginTitle'>Delete Account</div>
        </div>
        <div className='loginInputDiv'>
            <p className='accountDetailsText'>Deleting your account will remove all account details from the database, including order history. To proceed, enter your password then select 'Delete Account'</p>
            <label>Enter password</label>
            {deletePassIncorrect === true &&
                <p className='incorrectDetails'>Incorrect Password</p>
            }
            <br></br>
            <input type='password' ref={deleteAccPass}></input>
        </div>
        <div className='accountBtnContainer'>
            <button onClick={() => setDeletingAccount(false)} className='accountCancelBtn'>Cancel</button>
            <button onClick={DeleteAccount} className='accountBtn'>Delete Account</button>
        </div>
    </>
  )
}
