import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './Components/Home';
import Nav from './Components/Nav';
import Products from './Components/Products';
import Product from './Components/Product';
import Footer from './Components/Footer';
import Cart from './Components/Cart';
import Checkout from './Components/Checkout';
import Account from './Components/Account';
import DropdownMenu from './Components/DropdownMenu';

function App() {

  const [user, setUser] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [currentProduct, setCurrentProduct] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div>
      <BrowserRouter>
        <Nav setProductCategory={setProductCategory} cartItems={cartItems} setIsCartOpen={setIsCartOpen} user={user} toggleDropdown={setIsDropdownOpen} dropdownState={isDropdownOpen}/>
        {isCartOpen === true &&
          <Cart cartItems={cartItems} setCartItems={setCartItems} setIsCartOpen={setIsCartOpen}/>
        }
        {isDropdownOpen === true &&
          <DropdownMenu toggleDropdown={setIsDropdownOpen} setProductCategory={setProductCategory}/>
        }
        <Routes>
          <Route path='/' element={<Home setProductCategory={setProductCategory}/>} />
          <Route path='/Products' element={<Products category={productCategory} setCurrentProduct={setCurrentProduct} />} />
          <Route path='/Product' element={<Product currentProduct={currentProduct} setCartItems={setCartItems} setIsCartOpen={setIsCartOpen}/>} />
          <Route path='/Checkout' element={<Checkout cartItems={cartItems} setCartItems={setCartItems} setIsCartOpen={setIsCartOpen} user={user} />} />
          <Route path='/Account' element={<Account user={user} setUser={setUser} />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
