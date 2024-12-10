import React from 'react'
import { Link } from 'react-router-dom'

export default function DropdownMenu({toggleDropdown, setProductCategory}) {

  function SelectCategory(category) {
    setProductCategory(category)
    toggleDropdown(false);
  }

  return (
    <div className='dropdownMenu'>
        <ul className='dropdownList'>
        <Link to='/' className='dropdownLink' onClick={() => toggleDropdown(false)}>
            <li>HOME</li>
        </Link>
        <Link to='/Products' className='dropdownLink' onClick={() => SelectCategory('Skateboards')}>
            <li>SKATEBOARDS</li>
        </Link>
        <Link to='/Products' className='dropdownLink' onClick={() => SelectCategory('Clothing')}>
            <li>CLOTHING</li>
        </Link>
        <Link to='/Products' className='dropdownLink' onClick={() => SelectCategory('Shoes')}>
            <li>SHOES</li>
        </Link>
    </ul>
    </div>
  )
}
