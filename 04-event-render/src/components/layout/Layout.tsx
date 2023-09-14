import React from 'react'
import MainHeader from './MainHeader'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <MainHeader />
      <main>{children}</main>
    </>
  )
}

export default Layout
