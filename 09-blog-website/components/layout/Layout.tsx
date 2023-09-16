import React, { Children } from 'react'
import MainNavigation from './MainNavigation'

interface layoutProps {
  children: React.ReactNode
}
const Layout = ({ children }: layoutProps) => {
  return (
    <>
      <MainNavigation />
      <main>{children}</main>
    </>
  )
}

export default Layout
