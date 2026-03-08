import { newsData } from '../domains/newsEventsContent'

export const newsPageData = {
  id: 'news-page',
  title: 'News & Announcements',
  authorLabel: 'Debutron Lab Communications',
}

export const newsItems = newsData.map((item) => ({
  ...item,
  type: item.type || 'news',
  link: item.link || item.href || `/news/${item.id}`,
}))
