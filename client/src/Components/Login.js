import React, { useState, useRef } from 'react'
import accountService from '../Services/AccountServices'

export default function Login({setUser, setRegisteringAccount}) {

    const [incorrectDetails, setIncorrectDetails] = useState(false);

    const email = useRef();
    const password = useRef();
  
    // Login Function
    function Login() {
      const emailAddress = email.current.value;
      const pword = password.current.value;
  
      if(emailAddress === "" || pword === "") {
          alert("Please enter login details");
      } else {
          accountService.getAccount(emailAddress, pword)
          .then((res) => {
              if(res.data === "incorrect details") {
                  setIncorrectDetails(true);
              } else {
                  setUser(res.data);
              }
          })
          .catch((err) => {
              console.log(err);
          })
      }
    }

  return (
    <div className='loginContainer'>
        <div className='loginDiv'>
            <div className='loginTitle'>Login</div>
        </div>
        <div className='loginInputDiv'>
            {incorrectDetails === true && 
                <p className='incorrectDetails'>Incorrect Login Details</p>
            }
            <label>Email Address</label>
            <br></br>
            <input type="text" className='loginInput' ref={email}></input>
            <br></br>
            <label>Password</label>
            <br></br>
            <input type="password" className='loginInput' ref={password}></input>
        </div>
        <br></br>
        <div className='loginBtnDiv'>
            <button onClick={Login} className='confirmBtn'>LOGIN</button>
            <button onClick={() => setRegisteringAccount(true)} className='confirmBtn'>Register</button>
        </div> 
    </div>
  )
}
