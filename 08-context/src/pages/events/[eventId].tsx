import React from 'react'
import { getEventById, getFeaturedEvents } from '@/helpers/api-util'
import { GetStaticPaths, GetStaticProps } from 'next'
import { eventModel } from '@/model'
import EventSummary from '@/components/event-detail/EventSummary'
import EventLogistics from '@/components/event-detail/EventLogistics'
import EventContent from '@/components/event-detail/EventContent'
import ErrorAlert from '@/components/UI/ErrorAlert'
import Button from '@/components/UI/Button'
import Head from 'next/head'
import Comments from '@/components/input/Comments'

interface eventDetailProps {
  selectedEvent: eventModel
}

const EventDetailPage = ({ selectedEvent }: eventDetailProps) => {
  if (!selectedEvent) {
    return (
      <div className="center">
        <p>Loading....!</p>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>{selectedEvent.title}</title>
        <meta name="description" content={selectedEvent.description} />
      </Head>
      <EventSummary title={selectedEvent.title} />
      <EventLogistics
        date={selectedEvent.date}
        location={selectedEvent.location}
        title={selectedEvent.title}
        image={selectedEvent.image}
      />
      <EventContent>
        <p>{selectedEvent.description}</p>
      </EventContent>
      <Comments eventId={selectedEvent.id} />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const events = await getFeaturedEvents()

  const paths = events.map((event) => ({ params: { eventId: event.id } }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const eventId = context.params!.eventId
  const event = await getEventById(eventId as string)

  if (!event) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30,
  }
}

export default EventDetailPage
