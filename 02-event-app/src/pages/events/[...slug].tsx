import { useRouter } from 'next/router'
import React from 'react'
import { getFilteredEvents } from '../../../dummy-data'
import EventList from '@/components/events/EventList'
import ResultsTitle from '@/components/events/ResultTitle'
import Button from '@/components/UI/Button'
import ErrorAlert from '@/components/UI/ErrorAlert'

const FilteredEventsPage = () => {
  const router = useRouter()
  const filterData = router.query.slug

  console.log(filterData)
  if (!filterData) {
    return <p className="center">....loading</p>
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

  const filteredEvents = getFilteredEvents({ year: numYear, month: numMonth })

  if (!filteredEvents || filteredEvents.length === 0) {
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

  const date = new Date(numYear, numMonth - 1)

  return (
    <div>
      <>
        <ResultsTitle date={date} />
        <EventList items={filteredEvents} />
      </>
    </div>
  )
}

export default FilteredEventsPage
