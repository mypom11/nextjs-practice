import Link from 'next/link'
import React from 'react'
import classes from './Button.module.css'

interface buttonProps {
  children: React.ReactNode
  link?: string
  onClick?: () => void
}

const Button = ({ children, link, onClick }: buttonProps) => {
  if (link) {
    return (
      <Link href={link} className={classes.btn}>
        {children}
      </Link>
    )
  }
  return (
    <button className={classes.btn} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
