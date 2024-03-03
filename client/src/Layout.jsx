import React from 'react';
import { Outlet } from 'react-router';
import Header from './components/Header';

const Layout = () => {
  return (
    <div className="py-6 px-8 md:px-24  xl:px-44 flex flex-col min-h-screen">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
