import React from 'react'
import classes from './EventContent.module.css'

const EventContent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <section className={classes.content}>{children}</section>
}

export default EventContent
