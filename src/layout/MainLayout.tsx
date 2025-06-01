import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Sidebar from './ Sidebar'

const MainLayout = () => {
  return (
   <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col pl-0 md:pl-64 transition-all">
        <main className="">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>

  );
};


export default MainLayout
