import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav({setProductCategory, cartItems, setIsCartOpen, user, toggleDropdown, dropdownState}) {

  function SetCategory(category) {
    setProductCategory(category);
  }

  function ToggleDropdownMenu() {
    if(dropdownState) {
      toggleDropdown(false);
    } else {
      toggleDropdown(true);
    }
  }

  return (
    <div className='navBar'>
      <div className='navContainer'>
        <ul className='navBarList'>
            <li className='dropdownIcon' onClick={ToggleDropdownMenu}>
              <img src='images/HamburgerIcon.png' alt='' className='hamburgerIcon' />
            </li>
            <Link to='/' className='navLink'>
                <li>HOME</li>
            </Link>
            <Link to='/Products' onClick={() => SetCategory('Skateboards')} className='navLink'>
                <li>SKATEBOARDS</li>
            </Link>
            <Link to='/Products' onClick={() => SetCategory('Clothing')} className='navLink'>
                <li>CLOTHING</li>
            </Link>
            <Link to='/Products' onClick={() => SetCategory('Shoes')} className='navLink'>
                <li>SHOES</li>
            </Link>
            <div className='cartNavLink'>
              <Link to='/Account' className='navLink navLinkAccount'>
                  {user !== "" &&
                    <li>{user[0].firstName}</li>
                  }
                  {user === "" &&
                    <li>Log In</li>
                  }
              </Link>
              <button onClick={() => setIsCartOpen(true)} className='cartBtn'>
                <img src='images/CartIcon.png' alt='' className='cartIcon'/>
              </button>
              <p className='cartAmount'>{cartItems.length}</p>
            </div>
        </ul>
      </div>
    </div>
  )
}
