import {
  mockForumCurrentUserId,
  mockForumThreadsSeed,
  mockForumUsers,
} from './forum/mockForumData'

export const FORUM_THREADS_STORAGE_KEY = 'lms-global-forum-threads'

export const mockLeaderboard = mockForumUsers.map((user) => ({
  name: user.name,
  role: user.role,
  avatar: user.avatar,
  title: user.title,
  contributions: user.contributionCount,
}))

export const currentForumUser = mockForumUsers.find((user) => user.id === mockForumCurrentUserId) ?? mockForumUsers[0]

const userDirectory = mockForumUsers.reduce((accumulator, user) => {
  accumulator[user.id] = user
  return accumulator
}, {})

const resolveAuthor = (authorId) => {
  const user = userDirectory[authorId]

  if (!user) {
    return {
      id: authorId,
      name: 'Unknown User',
      role: 'Student',
      avatar: 'https://ui-avatars.com/api/?name=Unknown+User&background=CBD5E1&color=0F172A&size=96',
    }
  }

  return {
    id: user.id,
    name: user.name,
    role: user.role,
    avatar: user.avatar,
    title: user.title,
    contributions: user.contributionCount,
  }
}

const hydrateReplies = (replies = []) =>
  replies.map((reply) => ({
    ...reply,
    author: resolveAuthor(reply.authorId),
  }))

const hydrateComments = (comments = []) =>
  comments.map((comment) => ({
    ...comment,
    author: resolveAuthor(comment.authorId),
    replies: hydrateReplies(comment.replies),
  }))

const countResponses = (comments = []) =>
  comments.reduce((total, comment) => total + 1 + countResponses(comment.replies ?? []), 0)

export const baseForumThreads = mockForumThreadsSeed.map((thread) => {
  const comments = hydrateComments(thread.comments)

  return {
    ...thread,
    author: resolveAuthor(thread.authorId),
    comments,
    stats: {
      ...thread.stats,
      replies: countResponses(comments),
    },
  }
})

export const getStoredThreads = () => {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const stored = window.sessionStorage.getItem(FORUM_THREADS_STORAGE_KEY)
    if (!stored) {
      return []
    }

    const parsed = JSON.parse(stored)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export const saveStoredThreads = (threads) => {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.sessionStorage.setItem(FORUM_THREADS_STORAGE_KEY, JSON.stringify(threads))
  } catch {
    // ignore write errors
  }
}

export const mergeForumThreads = (incomingThread) => {
  const combinedThreads = [...getStoredThreads(), ...baseForumThreads]

  if (incomingThread) {
    combinedThreads.unshift(incomingThread)
  }

  const dedupedById = []
  const seen = new Set()

  for (const thread of combinedThreads) {
    if (!thread?.id || seen.has(thread.id)) {
      continue
    }

    seen.add(thread.id)
    dedupedById.push(thread)
  }

  return dedupedById
}

export const formatXp = (xp) => {
  if (xp >= 1000) {
    return `${(xp / 1000).toFixed(1).replace('.0', '')}k XP`
  }

  return `${xp} XP`
}
