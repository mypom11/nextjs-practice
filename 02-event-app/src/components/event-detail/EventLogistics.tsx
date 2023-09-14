import AddressIcon from '../icons/address-icon'
import DateIcon from '../icons/date-icon'
import LogisticsItem from './LogisticsItem'
import classes from './EventLogistics.module.css'
import { eventModel } from '../events/EventList'
import Image from 'next/image'

function EventLogistics({
  date,
  location,
  image,
  title,
}: Omit<eventModel, 'description' | 'id'>) {
  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const addressText = location.replace(', ', '\n')

  return (
    <section className={classes.logistics}>
      <div className={classes.image}>
        <Image src={`/${image}`} alt={title} width={300} height={300} />
      </div>
      <ul className={classes.list}>
        <LogisticsItem icon={DateIcon()}>
          <time>{humanReadableDate}</time>
        </LogisticsItem>
        <LogisticsItem icon={AddressIcon()}>
          <address>{addressText}</address>
        </LogisticsItem>
      </ul>
    </section>
  )
}

export default EventLogistics
