import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <Header />
      <main className="flex-grow p-0 m-0">
        <Outlet />
      </main>
      {/* Optionally, add a footer here */}
    </div>
  );
};

export default Layout;
