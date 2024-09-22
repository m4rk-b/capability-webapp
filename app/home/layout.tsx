import React from 'react'
import NavBar from './(navbar)/(components)/nav';
import { Toaster } from 'react-hot-toast';

const HomeLayout = async({ children } : { children: React.ReactNode }) => {
  return (
    <>
    <NavBar />
        { children }
        <Toaster position='bottom-center' />
    </>
  )
}

export default HomeLayout;