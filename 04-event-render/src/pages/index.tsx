import React from 'react'
import { getFeaturedEvents } from '../helpers/api-util'
import EventList from '@/components/events/EventList'
import { GetStaticProps } from 'next'
import { eventModel } from '@/model'

interface homePageProps {
  events: eventModel[]
}

const HomePage = ({ events }: homePageProps) => {
  return (
    <div>
      <EventList items={events} />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents()
  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  }
}

export default HomePage
