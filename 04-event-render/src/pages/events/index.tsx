import React from 'react'
import { getAllEvents } from '@/helpers/api-util'
import EventList from '@/components/events/EventList'
import EventSearch from '@/components/events/EventSearch'
import { useRouter } from 'next/router'
import { eventModel } from '@/model'

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
