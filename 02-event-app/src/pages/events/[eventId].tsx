import { useRouter } from 'next/router'
import React from 'react'
import { getEventById } from '../../../dummy-data'
import EventSummary from '@/components/event-detail/EventSummary'
import EventLogistics from '@/components/event-detail/EventLogistics'
import EventContent from '@/components/event-detail/EventContent'
import ErrorAlert from '@/components/UI/ErrorAlert'
import Button from '@/components/UI/Button'

const EventDetailPage = () => {
  const router = useRouter()
  const eventId = router.query.eventId

  const event = eventId ? getEventById(eventId as string) : undefined

  if (!event) {
    return (
      <ErrorAlert>
        <p>No Event Data Found!</p>
        <Button link="/events">Show All Events</Button>
      </ErrorAlert>
    )
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        location={event.location}
        title={event.title}
        image={event.image}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  )
}

export default EventDetailPage
