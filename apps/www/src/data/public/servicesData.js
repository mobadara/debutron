import { servicesWithDetails } from '../domains/programsServicesContent'

export const servicesPageData = {
  id: 'services-page',
  title: 'Services & Student Support',
  subtitle:
    'Explore our active services including examination registration, educational consulting, and testing center readiness support.',
}

export const serviceItems = servicesWithDetails.map((item) => ({
  ...item,
  type: item.type || 'service',
}))
