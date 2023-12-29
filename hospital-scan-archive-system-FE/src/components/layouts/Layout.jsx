import React from 'react';
import {Outlet} from 'react-router-dom';
import Header from '../Header';

const Layout = () => {
  return (
    <div className='min-h-screen'>
        <Header />

        <main className=''>
            <Outlet />
        </main>

        {/* <Footer /> */}
    </div>
  )
}

export default Layout;