import AddressIcon from '../icons/address-icon'
import DateIcon from '../icons/date-icon'
import LogisticsItem from './LogisticsItem'
import classes from './EventLogistics.module.css'
import { eventModel } from '../events/EventList'

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
        <img src={`/${image}`} alt={title} />
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
