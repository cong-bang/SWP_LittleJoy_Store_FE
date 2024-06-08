// src/layouts/UserLayout.js
import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const UserLayout = ({ children }) => {
  return (
    <>
      <Header />
        <main>{children}</main>
      <Footer />
    </>
  );
};

export default UserLayout;
