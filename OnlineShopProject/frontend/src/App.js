import Header from "./components/Header";
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Products from "./components/Products";
import { Routes, Route } from "react-router-dom";
import ProductView from "./components/ProductView";
import CartView from "./components/CartView";

import React, { useState } from 'react';
import Profile from "./components/Profile";

function App() {

  const [cartUpdate, setCartUpdate] = useState(0);

  return (
    <>
      <Header cartUpdate={cartUpdate} />
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/brands/categories/:brandId/:categoryId" element={<Products /> } />
        <Route path="/products/:productId" element={<ProductView setCartUpdate={setCartUpdate} cartUpdate={cartUpdate}/> } />
        <Route path="/cart" element={<CartView setCartUpdate={setCartUpdate} cartUpdate={cartUpdate}/>} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
