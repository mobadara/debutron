import React from 'react'
import { Link, useOutletContext, useParams } from 'react-router-dom'
import { FiDownload } from 'react-icons/fi'
import { getCourseById } from '../data/courses'
import { getCourseProgressPercentage, getLessonProgress, getResolvedCourse } from '../data/lmsProgress'
import {
	getCourseSyllabusDownloadName,
	getCourseSyllabusPdfUrl,
} from '../data/syllabus'

export default function CourseContents() {
	const { courseId } = useParams()
	const outletContext = useOutletContext()
	const baseCourse = outletContext?.course ?? getCourseById(courseId)
	let course = null

	try {
		course = baseCourse ? getResolvedCourse(baseCourse) : null
	} catch {
		course = baseCourse ?? null
	}

	if (!course) {
		return (
			<div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-8">
				<h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Course not found</h2>
				<p className="text-slate-600 dark:text-slate-400 mb-6">This course may no longer be available.</p>
				<Link to="/courses" className="inline-block bg-[#000080] text-white px-4 py-2 rounded-lg font-bold">Back to all courses</Link>
			</div>
		)
	}

	const syllabusUrl = getCourseSyllabusPdfUrl(course)
	const downloadName = getCourseSyllabusDownloadName(course)
	const courseProgress = getCourseProgressPercentage(course)

	return (
		<div className="flex flex-col gap-4 sm:gap-6">
			<section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 lg:p-8 shadow-sm">
				<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">Contents</h2>
						<p className="text-slate-600 dark:text-slate-400 mt-1">Track your weekly progress and download the course syllabus.</p>
					</div>
					<a
						href={syllabusUrl}
						download={downloadName}
						className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#000080] text-white px-4 py-2 font-bold hover:bg-blue-900 transition-colors"
					>
						<FiDownload size={16} />
						Download Syllabus
					</a>
				</div>
				<div className="mt-5">
					<div className="mb-1 flex items-center justify-between text-sm font-medium text-slate-600 dark:text-slate-400">
						<span>Overall Progress</span>
						<span>{courseProgress}%</span>
					</div>
					<div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700">
						<div className="h-2 rounded-full bg-blue-600" style={{ width: `${courseProgress}%` }} />
					</div>
				</div>
			</section>

			<section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 lg:p-8 shadow-sm">
				<div className="space-y-3">
					{course.lessons.map((lesson) => {
						const lessonProgress = getLessonProgress(course.id, lesson.id)
						const totalItems = lesson.items.length
						const completedItems = lessonProgress.completedItemIds.length
						const percent = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0
						const firstAvailableItem = lesson.items.find((item) => !item.locked)?.id || lesson.items[0]?.id
						const lessonTarget = `/course/${courseId}/lesson/${lesson.id}?item=${firstAvailableItem}`
						const cardClassName = `block rounded-lg border border-slate-200 dark:border-slate-700 p-4 transition-colors ${
							lesson.disabled
								? 'bg-slate-100 dark:bg-slate-800/50 opacity-70 cursor-not-allowed pointer-events-none'
								: 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
						}`
						const lessonContent = (
							<>
								<div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
									<div className="flex items-center gap-2">
										<p className="font-semibold text-slate-900 dark:text-white">{lesson.title}</p>
										{lesson.disabled && (
											<span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
												Coming soon
											</span>
										)}
									</div>
									<span className="text-sm font-medium text-slate-600 dark:text-slate-400">{completedItems}/{totalItems} complete</span>
								</div>
								<div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700">
									<div className="h-2 rounded-full bg-[#0D9488]" style={{ width: `${percent}%` }} />
								</div>
							</>
						)

						if (lesson.disabled) {
							return (
								<div key={lesson.id} aria-disabled="true" className={cardClassName}>
									{lessonContent}
								</div>
							)
						}

						return (
							<Link key={lesson.id} to={lessonTarget} className={cardClassName}>
								{lessonContent}
							</Link>
						)
					})}
				</div>
			</section>
		</div>
	)
}
