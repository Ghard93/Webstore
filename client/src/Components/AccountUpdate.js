import React, { useState, useRef } from 'react'
import accountService from '../Services/AccountServices'

export default function AccountUpdate({user, setUpdatingAccountDetails}) {

  const [updateFieldMissing, setUpdateFieldMissing] = useState(false);
  const [updateEmailInvalid, setUpdateEmailInvalid] = useState(false);
  const [updateNumberInvalid, setUpdateNumberInvalid] = useState(false);
  const [updateFNameInvalid, setUpdateFNameInvalid] = useState(false);
  const [updateLNameInvalid, setUpdateLNameInvalid] = useState(false);

  const updateEmail = useRef();
  const updatePhoneNumber = useRef();
  const updateFirstName = useRef();
  const updateLastName = useRef();

  function UpdateAccountDetails() {
    const emailAddress = updateEmail.current.value;
    const number = updatePhoneNumber.current.value;
    const fName = updateFirstName.current.value;
    const lName = updateLastName.current.value;

    setUpdateEmailInvalid(false);
    setUpdateFNameInvalid(false);
    setUpdateLNameInvalid(false);
    setUpdateFieldMissing(false);
    setUpdateNumberInvalid(false);

    if(emailAddress === "" || number === "" || fName === "" || lName === "") {
        setUpdateFieldMissing(true);
    } else if(!emailAddress.includes("@")) {
        setUpdateEmailInvalid(true);
    } else if(emailAddress.search(/[[\]()+=*&^%$#!`~<>?'":;{}|\\/]/) !== -1) {
        setUpdateEmailInvalid(true);
    } else if(number.search(/[a-z]|[A-Z]|[[\]()+=*&^%$#!`~<>?'":;{}|\\/]|[-]/) !== -1) {
        setUpdateNumberInvalid(true);
    } else if(fName.search(/[0-9]|[[\]()+=*&^%$#!`~<>?'":;{}|\\/]/) !== -1) {
        setUpdateFNameInvalid(true);
    } else if(lName.search(/[0-9]|[[\]()+=*&^%$#!`~<>?'":;{}|\\/]/) !== -1) {
        setUpdateLNameInvalid(true);
    } else {
        const updateDetails = {
            firstName: fName,
            lastName: lName,
            email: emailAddress,
            phoneNumber: number
        }
        
        accountService.updateAccountDetails(user[0].email, updateDetails)
        .then((res) => {
            if(res.data === "success") {
                console.log("account details updated");
                user[0].firstName = fName;
                user[0].lastName = lName;
                user[0].email = emailAddress;
                user[0].phoneNumber = number;
                setUpdatingAccountDetails(false);
            } else if(res.data === "account not found"){
                console.log("account not found")
            } else {
                console.log("error updating account");
            }
        })
    }
  }

  return (
    <>
        <div className='loginDiv'>
            <div className='loginTitle'>Update Details</div>
        </div>
        <div className='loginInputDiv'>
            {updateFieldMissing === true &&
                <p className='incorrectDetails'>All fields must be filled</p>
            }
            <label>Email Address:</label>
            {updateEmailInvalid === true &&
                <p className='incorrectDetails'>Invalid email address</p>
            }
            <br></br>
            <input type='text' ref={updateEmail} defaultValue={user[0].email}></input>
            <br></br>
            <label>Phone Number:</label>
            {updateNumberInvalid === true &&
                <p className='incorrectDetails'>Invalid phone number</p>
            }
            <br></br>
            <input type='text' ref={updatePhoneNumber} defaultValue={user[0].phoneNumber}></input>
            <br></br>
            <label>First Name:</label>
            {updateFNameInvalid === true &&
                <p className='incorrectDetails'>First name cannot contain numbers</p>
            }
            <br></br>
            <input type='text' ref={updateFirstName} defaultValue={user[0].firstName}></input>
            <br></br>
            <label>Last Name:</label>
            {updateLNameInvalid === true &&
                <p className='incorrectDetails'>Last name cannot contain numbers</p>
            }
            <br></br>
            <input type='text' ref={updateLastName} defaultValue={user[0].lastName}></input>                        
            <div className='accountBtnContainer'>
                <button onClick={() => setUpdatingAccountDetails(false)} className='accountCancelBtn'>Cancel</button>
                <button onClick={UpdateAccountDetails} className='accountBtn'>Update Details</button>
            </div>
        </div>
    </>
  )
}
