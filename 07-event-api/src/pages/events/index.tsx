import React from 'react'
import { getAllEvents } from '@/helpers/api-util'
import EventList from '@/components/events/EventList'
import EventSearch from '@/components/events/EventSearch'
import { useRouter } from 'next/router'
import { eventModel } from '@/model'
import Head from 'next/head'

interface allEventsProps {
  events: eventModel[]
}

const AllEventsPage = ({ events }: allEventsProps) => {
  const router = useRouter()

  const findEventsHandler = (year: string, month: string) => {
    const fullPath = `/events/${year}/${month}`
    router.push(fullPath)
  }
  return (
    <>
      <Head>
        <title>All Events</title>
        <meta
          name="description"
          content="Find a lot of great events allow you to evolve..."
        />
      </Head>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
  )
}

export const getStaticProps = async () => {
  const events = await getAllEvents()

  return {
    props: { events },
    revalidate: 60,
  }
}

export default AllEventsPage
