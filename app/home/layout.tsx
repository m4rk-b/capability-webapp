import React from 'react'
import NavBar from './(navbar)/(components)/nav';

const HomeLayout = async({ children } : { children: React.ReactNode }) => {
  return (
    <>
    <NavBar />
        { children }
    </>
  )
}

export default HomeLayout;