import React, { useState } from 'react'
import Login from './Login';
import Register from './Register';
import AccountDetails from './AccountDetails';

export default function Account({user, setUser}) {

  const [registeringAccount, setRegisteringAccount] = useState(false);

  return (
    <div className='heightContainer'>
      {/* LOGIN */}
      {user === "" && registeringAccount === false &&
        <Login setUser={setUser} setRegisteringAccount={setRegisteringAccount} />
      }
      {/* ACCOUNT DETAILS */}
      {user !== "" &&
        <AccountDetails user={user} setUser={setUser}/>
      }
      {/* REGRISTER ACCOUNT */}
      {registeringAccount === true &&
        <Register setRegisteringAccount={setRegisteringAccount} />
      }
    </div>
  )
}
