import React from 'react'
import classes from './LogisticItem.module.css'

interface logisticsItemProps {
  icon: JSX.Element
  children: React.ReactNode
}

const LogisticsItem = ({ icon, children }: logisticsItemProps) => {
  return (
    <li className={classes.item}>
      <span className={classes.icon}>{icon}</span>
      <span className={classes.content}>{children}</span>
    </li>
  )
}

export default LogisticsItem
