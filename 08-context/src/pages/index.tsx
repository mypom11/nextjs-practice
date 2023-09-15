import React from 'react'
import { getFeaturedEvents } from '../helpers/api-util'
import EventList from '@/components/events/EventList'
import { GetStaticProps } from 'next'
import { eventModel } from '@/model'
import Head from 'next/head'
import NewsletterRegistration from '@/components/input/NewsletterRegistration'

interface homePageProps {
  events: eventModel[]
}

const HomePage = ({ events }: homePageProps) => {
  return (
    <div>
      <Head>
        <title>NextJs Events</title>
        <meta
          name="description"
          content="Find a lot of great events allow you to evolve..."
        />
      </Head>
      <NewsletterRegistration />
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
