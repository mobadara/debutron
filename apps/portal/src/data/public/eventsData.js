import { eventsData } from '../domains/newsEventsContent'

export const eventsPageData = {
  id: 'events-page',
  title: 'Academic Calendar & Events',
  searchPlaceholder: 'Search events',
  categories: ['All Categories', 'Academics', 'Technology', 'Admissions'],
}

export const eventItems = eventsData.map((item) => ({
  ...item,
  type: item.type || 'event',
}))
