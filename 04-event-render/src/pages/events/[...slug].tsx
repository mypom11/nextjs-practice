import { useRouter } from 'next/router'
import React from 'react'
import { getFilteredEvents } from '@/helpers/api-util'
import EventList from '@/components/events/EventList'
import ResultsTitle from '@/components/events/ResultTitle'
import Button from '@/components/UI/Button'
import ErrorAlert from '@/components/UI/ErrorAlert'
import { GetServerSideProps } from 'next'
import { eventModel } from '@/model'

interface filterdEventProps {
  hasErrorType: string | null
  events?: eventModel[]
  eventDate?: {
    year: number
    month: number
  }
}

const FilteredEventsPage = ({
  hasErrorType,
  events,
  eventDate,
}: filterdEventProps) => {
  if (hasErrorType === 'Empty') {
    return (
      <>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    )
  }

  if (hasErrorType === 'Invaild') {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    )
  }

  const date = new Date(eventDate!.year, eventDate!.month - 1)

  return (
    <div>
      <>
        <ResultsTitle date={date} />
        <EventList items={events as eventModel[]} />
      </>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context
  const filterData = params!.slug

  if (!filterData) {
    return {
      props: { hasError: 'Invaild' },
    }
  }

  const filteredYear = filterData[0]
  const filteredMonth = filterData[1]

  const numYear = +filteredYear
  const numMonth = +filteredMonth

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      props: { hasError: 'Invaild' },
    }
  }
  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  })

  if (!filteredEvents || filteredEvents.length === 0) {
    return {
      props: { hasErrorType: 'Empty' },
      // notFound: true,
      // redirect: {
      //   destination: '/',
      // },
    }
  }

  return {
    props: {
      hasError: null,
      events: filteredEvents,
      eventDate: {
        year: numYear,
        month: numMonth,
      },
    },
  }
}

export default FilteredEventsPage
