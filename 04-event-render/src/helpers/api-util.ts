import { eventModel } from '@/model'

export const getAllEvents = async () => {
  const response = await fetch(
    'https://next-project-f8c39-default-rtdb.firebaseio.com/events.json'
  )
  const data = await response.json()
  const events = []
  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    })
  }
  return events
}

export const getFeaturedEvents = async () => {
  const allEvents = await getAllEvents()
  return allEvents.filter((event) => event.isFeatured)
}

export const getEventById = async (id: string) => {
  const allEvents = await getAllEvents()
  const filterdEvent = allEvents.find((event) => event.id === id)
  return filterdEvent
}
interface dateFilterModel {
  year: number
  month: number
}

export async function getFilteredEvents(dateFilter: dateFilterModel) {
  const { year, month } = dateFilter
  const allEvents = await getAllEvents()
  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date)
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    )
  })

  return filteredEvents
}
