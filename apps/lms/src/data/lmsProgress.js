export const LMS_PROGRESS_STORAGE_KEY = 'debutron-lms-progress'

const normalizeLessonProgress = (progress) => {
  const completedItemIds = Array.isArray(progress?.completedItemIds)
    ? [...new Set(progress.completedItemIds.filter(Boolean))]
    : []

  const quizAttempts = progress?.quizAttempts && typeof progress.quizAttempts === 'object'
    ? progress.quizAttempts
    : {}

  return {
    completedItemIds,
    quizAttempts,
  }
}

const getStoredProgressMap = () => {
  if (typeof window === 'undefined') {
    return {}
  }

  try {
    const stored = window.sessionStorage.getItem(LMS_PROGRESS_STORAGE_KEY)
    if (!stored) {
      return {}
    }

    const parsed = JSON.parse(stored)
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

const saveStoredProgressMap = (progressMap) => {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.sessionStorage.setItem(LMS_PROGRESS_STORAGE_KEY, JSON.stringify(progressMap))
  } catch {
    // ignore write errors
  }
}

export const getLessonProgress = (courseId, lessonId) => {
  const progressMap = getStoredProgressMap()
  return normalizeLessonProgress(progressMap?.[courseId]?.[lessonId])
}

export const saveLessonProgress = (courseId, lessonId, progress) => {
  const progressMap = getStoredProgressMap()
  const nextProgress = normalizeLessonProgress(progress)

  saveStoredProgressMap({
    ...progressMap,
    [courseId]: {
      ...(progressMap[courseId] ?? {}),
      [lessonId]: nextProgress,
    },
  })

  return nextProgress
}

export const updateLessonProgress = (courseId, lessonId, updater) => {
  const currentProgress = getLessonProgress(courseId, lessonId)
  const nextProgress = typeof updater === 'function' ? updater(currentProgress) : updater
  return saveLessonProgress(courseId, lessonId, nextProgress)
}

const resolveItemLockedState = (item, lessonProgress) => {
  const prerequisites = Array.isArray(item.unlockAfter) ? item.unlockAfter : []
  const isWaitingForPrerequisite = prerequisites.length > 0 && !prerequisites.every((itemId) =>
    lessonProgress.completedItemIds.includes(itemId)
  )

  return Boolean(item.locked) || isWaitingForPrerequisite
}

export const getResolvedLesson = (courseId, lesson, lessonProgress = getLessonProgress(courseId, lesson.id)) => ({
  ...lesson,
  items: lesson.items.map((item) => ({
    ...item,
    locked: resolveItemLockedState(item, lessonProgress),
  })),
})

export const getResolvedCourse = (course) => ({
  ...course,
  lessons: course.lessons.map((lesson) => getResolvedLesson(course.id, lesson)),
})

export const getCourseCompletionStats = (course) => {
  const completedItemIds = new Set()
  let totalItems = 0

  course.lessons.forEach((lesson) => {
    const lessonProgress = getLessonProgress(course.id, lesson.id)
    totalItems += lesson.items.length
    lessonProgress.completedItemIds.forEach((itemId) => completedItemIds.add(`${lesson.id}:${itemId}`))
  })

  return {
    completedItems: completedItemIds.size,
    totalItems,
  }
}

export const getCourseProgressPercentage = (course) => {
  const { completedItems, totalItems } = getCourseCompletionStats(course)

  if (completedItems === 0 || totalItems === 0) {
    return course.progress ?? 0
  }

  const trackedProgress = Math.round((completedItems / totalItems) * 100)
  return Math.max(course.progress ?? 0, trackedProgress)
}

export const getQuizAttempt = (courseId, lessonId, itemId) => {
  const lessonProgress = getLessonProgress(courseId, lessonId)
  return lessonProgress.quizAttempts?.[itemId] ?? null
}

export const formatRelativeTimestamp = (isoTimestamp) => {
  if (!isoTimestamp) {
    return null
  }

  const timestamp = new Date(isoTimestamp)
  if (Number.isNaN(timestamp.getTime())) {
    return null
  }

  const elapsedMs = Date.now() - timestamp.getTime()
  const elapsedSeconds = Math.floor(Math.abs(elapsedMs) / 1000)

  if (elapsedSeconds < 60) {
    return elapsedMs >= 0 ? 'just now' : 'in a few seconds'
  }

  const timeUnits = [
    ['year', 60 * 60 * 24 * 365],
    ['month', 60 * 60 * 24 * 30],
    ['week', 60 * 60 * 24 * 7],
    ['day', 60 * 60 * 24],
    ['hour', 60 * 60],
    ['minute', 60],
  ]

  const formatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

  for (const [unit, unitSeconds] of timeUnits) {
    if (elapsedSeconds >= unitSeconds) {
      const value = Math.floor(elapsedSeconds / unitSeconds)
      return formatter.format(elapsedMs >= 0 ? -value : value, unit)
    }
  }

  return 'just now'
}
