export const getCourseSyllabusTitle = (course) => {
	const title = course?.title?.trim()
	return title || 'Welcome'
}

export const getCourseSyllabusPdfUrl = (course) => course?.syllabusPdf || '/syllabi/welcome.pdf'

const toSafeFileSegment = (value) =>
	value
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '') || 'welcome'

export const getCourseSyllabusDownloadName = (course) => `${toSafeFileSegment(getCourseSyllabusTitle(course))}.pdf`
