import React, { useState, useRef } from 'react'
import accountService from '../Services/AccountServices'

export default function Register({setRegisteringAccount}) {

  const [registerFieldMissing, setRegisterFieldMissing] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [passwordsDontMatch, setPasswordsDontMatch] = useState(false);

  const newEmail = useRef();
  const newPassword = useRef();
  const confirmNewPassword = useRef();
  const phoneNumber = useRef();
  const firstname = useRef();
  const lastname = useRef();

  function CreateAccount() {
    const emailAddress = newEmail.current.value;
    const pass = newPassword.current.value;
    const passConfirm = confirmNewPassword.current.value;
    const number = phoneNumber.current.value;
    const fName = firstname.current.value;
    const lName = lastname.current.value;

    setRegisterFieldMissing(false);
    setPasswordsDontMatch(false);
    setInvalidEmail(false);

    if(emailAddress === "" || pass === "" || passConfirm === "" || number === "" || fName === "" || lName === "") {
        setRegisterFieldMissing(true);
    } else if(!emailAddress.includes("@")) {
        setInvalidEmail(true);
    } else if(emailAddress.search(/[[\]()+=*&^%$#!`~<>?'":;{}|\\/]/) !== -1) {
        setInvalidEmail(true);
    } else if(pass !== passConfirm) {
        setPasswordsDontMatch(true);
    } else {
        const newAccount = {
            email: emailAddress,
            password: pass,
            phoneNumber: number,
            firstName: fName,
            lastName: lName
        }

        accountService.postAccount(newAccount)
        .then((res) => {
            if(res.data === "success"){
                setRegisteringAccount(false);
            } else if(res.data === "account already exists") {
                alert("An account with that email address already exists");
            } else {
                alert("Error creating account. Please try again");
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }
  }

  return (
    <div className='loginContainer'>
        <div className='loginTitleDiv'>
            <div className='loginTitle'>Create Account</div>
        </div>
        <div className='loginInputDiv'>
            {registerFieldMissing === true &&
                <p className='incorrectDetails'>All fields must be filled</p>
            }
            <label>Email Address</label>
            <br></br>
            {invalidEmail === true &&
                <p className='incorrectDetails'>Invalid email address</p>
            }
            <input type="text" ref={newEmail} className='loginInput'></input>
            <br></br>
            {passwordsDontMatch === true &&
                <p className='incorrectDetails'>Passwords do not match</p>
            }
            <label>Password</label>
            <br></br>
            <input type="password" ref={newPassword} className='loginInput'></input>
            <br></br>
            <label>Confirm Password</label>
            <br></br>
            <input type="password" ref={confirmNewPassword} className='loginInput'></input>
            <br></br>
            <label>Phone Number</label>
            <br></br>
            <input type="text" ref={phoneNumber} className='loginInput'></input>
            <br></br>
            <label>First Name</label>
            <br></br>
            <input type="text" ref={firstname} className='loginInput'></input>
            <br></br>
            <label>Last Name</label>
            <br></br>
            <input type="text" ref={lastname} className='loginInput'></input>
        </div>
        <br></br>
        <div className='accountBtnContainer'>
            <button onClick={() => setRegisteringAccount(false)} className='accountCancelBtn'>Cancel</button>
            <button onClick={CreateAccount} className='accountBtn'>Create Account</button>
        </div>
    </div>
  )
}
