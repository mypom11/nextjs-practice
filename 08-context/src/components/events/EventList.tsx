import React from 'react'
import EventItem from './EventItem'
import { eventModel } from '@/model'
import classes from './EventList.module.css'

interface propsModel {
  items: eventModel[]
}

const EventList = ({ items }: propsModel) => {
  return (
    <ul className={classes.list}>
      {items.map((event) => (
        <EventItem
          key={event.id}
          id={event.id}
          title={event.title}
          location={event.location}
          date={event.date}
          image={event.image}
        />
      ))}
    </ul>
  )
}

export default EventList
