import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './pages/Nav/Nav';
// import Login from './pages/UserAccount/Login/Login';
import Main from './pages/Main/Main';
import Cart from './pages/Cart/Cart';
import Detail from './pages/Detail/Detail';
// import SignUp from './pages/UserAccount/SignUp/SignUp';
// import Footer from './pages/Footer/Footer';

const Router = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/cart" element={<Cart />} />
        <Route path="/main" element={<Main />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/products/:id" element={<Detail />} />
        {/* <Route path="/signup" element={<SignUp />} /> */}
        {/* <Route path="/footer" element={<Footer />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
