import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './pages/Nav/Nav';
import Login from './pages/UserAccount/Login/Login';
import Main from './pages/Main/Main';
import Cart from './pages/Cart/Cart';
import Detail from './pages/Detail/Detail';
import SignUp from './pages/UserAccount/SignUp/SignUp';
import Footer from './pages/Footer/Footer';
import Payment from './pages/Payment/Payment';
import Maintheme from './pages/Maintheme/Maintheme';

const Router = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Nav />
      <Routes>
        <Route path="/cart" element={<Cart />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Payment />} />
        <Route path="/products/:id" element={<Detail />} />
        <Route path="/main" element={<Main />} />
        <Route path="/products" element={<Maintheme />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
