import React, { useState, useRef } from 'react'
import accountService from '../Services/AccountServices'

export default function PasswordChange({user, setChangingPassword}) {

  const [changePassFieldMissing, setChangePassFieldMissing] = useState(false);
  const [changePassIncorrect, setChangePassIncorrect] = useState(false);
  const [changePassNotMatching, setChangePassNotMatching] = useState(false);

  const updatePasswordPrevious = useRef();
  const updatePasswordNew = useRef();
  const updatePasswordConfirm = useRef();

  function ChangePassword() {
    const currentPass = updatePasswordPrevious.current.value;
    const newPass = updatePasswordNew.current.value;
    const newPassConfirm = updatePasswordConfirm.current.value;

    setChangePassFieldMissing(false);
    setChangePassIncorrect(false);
    setChangePassNotMatching(false);

    if(currentPass === "" || newPass === "" || newPassConfirm === "") {
        setChangePassFieldMissing(true);
    } else if(newPass !== newPassConfirm){
        setChangePassNotMatching(true);
    } else {
        const newPassDetails = {
            currentPass: currentPass,
            newPass: newPass
        }

        accountService.changePassword(user[0].email, newPassDetails)
        .then((res) => {
            if(res.data === "incorrect password") {
                setChangePassIncorrect(true);
            } else if(res.data === "account not found") {
                alert('error changing password')
            } else {            
                setChangingPassword(false);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }
  }

  function CancelPasswordChange() {
    setChangePassFieldMissing(false);
    setChangePassIncorrect(false);
    setChangePassNotMatching(false);
    setChangingPassword(false);
  }

  return (
    <>
        <div className='loginDiv'>
            <div className='loginTitle'>Change Password</div>
        </div>
        <div className='loginInputDiv'>
            {changePassFieldMissing === true &&
                <p className='incorrectDetails'>All fields must be filled</p>
            }
            <label>Current Password:</label>
            {changePassIncorrect === true &&
                <p className='incorrectDetails'>Incorrect Password</p>
            }
            <br></br>
            <input type='password' ref={updatePasswordPrevious}></input>
            <br></br>
            <label>New Password:</label>
            <br></br>
            <input type='password' ref={updatePasswordNew}></input>
            <br></br>
            <label>Confirm New Password:</label>
            {changePassNotMatching === true &&
                <p className='incorrectDetails'>Passwords do not match</p>
            }
            <br></br>
            <input type='password' ref={updatePasswordConfirm}></input>
            <div className='accountBtnContainer'>
                <button onClick={CancelPasswordChange} className='accountCancelBtn'>Cancel</button>
                <button onClick={ChangePassword} className='accountBtn'>Update Password</button>
            </div>
        </div>
    </>
  )
}
