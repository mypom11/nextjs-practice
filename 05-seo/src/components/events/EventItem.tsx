import React from 'react'
import { eventModel } from './EventList'

import classes from './EventItem.module.css'
import Button from '../UI/Button'
import DateIcon from '../icons/date-icon'
import AddressIcon from '../icons/address-icon'
import ArrowRightIcon from '../icons/arrow-right-icon'
import Image from 'next/image'

const EventItem = ({ title, image, date, location, id }: eventModel) => {
  const formattedDate = new Date(date).toLocaleDateString('ko-KR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const formattedAddress = location.replace(', ', '\n')

  const exploreLink = `/events/${id}`

  return (
    <li className={classes.item}>
      <Image src={'/' + image} alt={title} width={280} height={340} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{formattedDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button link={exploreLink}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  )
}

export default EventItem
