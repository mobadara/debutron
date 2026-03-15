import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { FiBook, FiCheckSquare, FiExternalLink, FiUsers } from 'react-icons/fi'
import { ACTIVE_COURSES_BY_PROGRAM, PROGRAMS_BY_TRACK, TRACK_LABELS } from '../data/courses'
import { getCourseProgressPercentage } from '../data/lmsProgress'
import { LMS_CALENDAR_EVENTS, LMS_STUDENT } from '../data/dashboard'

function LMSDashboard() {
	const [activeTrack, setActiveTrack] = useState(LMS_STUDENT.enrolledTrackIds[0])
	const [activeProgram, setActiveProgram] = useState('p1')
	const [calendarDate, setCalendarDate] = useState(new Date())

	useEffect(() => {
		setActiveProgram(PROGRAMS_BY_TRACK[activeTrack][0].id)
	}, [activeTrack])

	const currentCourses = ACTIVE_COURSES_BY_PROGRAM[activeProgram] || []
	const libraryUrl = import.meta.env.VITE_LIBRARY_URL || '#'
	const enrollmentBadges = LMS_STUDENT.badgesByTrack[activeTrack] || []

	const visibleMonthEvents = useMemo(() => {
		const selectedMonth = calendarDate.getMonth()
		const selectedYear = calendarDate.getFullYear()

	 	return LMS_CALENDAR_EVENTS.filter((event) => {
			const eventDate = event.date
			return eventDate.getMonth() === selectedMonth && eventDate.getFullYear() === selectedYear
		})
	}, [calendarDate])

	const hasEventOnDate = (date) =>
		LMS_CALENDAR_EVENTS.some((event) =>
			event.date.getFullYear() === date.getFullYear() &&
			event.date.getMonth() === date.getMonth() &&
			event.date.getDate() === date.getDate()
		)

	return (
		<div className="flex flex-col lg:flex-row w-full h-full">
			{/* LEFT PANE: Main Content (70%) */}
			<div className="w-full lg:w-[70%] p-4 sm:p-6 lg:p-10 lg:border-r border-slate-200 dark:border-slate-800 lg:overflow-y-auto">
				{/* Profile Welcome Section */}
				<div className="mb-8 border-b border-slate-200 dark:border-slate-800 pb-8">
					<h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Welcome back, {LMS_STUDENT.name}</h1>
					<div className="flex flex-wrap items-center gap-3 mt-2">
						<div className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full text-sm font-medium border border-slate-200 dark:border-slate-700">
							<span className="font-semibold">Student ID:</span> {LMS_STUDENT.studentCode}
						</div>
						{enrollmentBadges.map((badge) => (
							<div
								key={badge.id}
								className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full text-sm font-medium border border-slate-200 dark:border-slate-700"
							>
								<span className="font-semibold">{badge.label}:</span> {badge.value}
							</div>
						))}
					</div>
				</div>

				{/* Track Selector Tabs */}
				<div className="mb-8">
					{LMS_STUDENT.enrolledTrackIds.length > 1 && (
						<div className="flex gap-0 border-b border-slate-200 dark:border-slate-800">
							{LMS_STUDENT.enrolledTrackIds.map((track) => (
								<button
									key={track}
									type="button"
									onClick={() => setActiveTrack(track)}
									aria-pressed={activeTrack === track}
									className={`px-6 py-3 text-sm font-semibold transition-colors border-b-2 ${
										activeTrack === track
											? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
											: 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-300'
									}`}
								>
									{TRACK_LABELS[track]}
								</button>
							))}
						</div>
					)}

					{/* Program Pills */}
					<div className="mt-5 flex flex-wrap items-center gap-2">
						{PROGRAMS_BY_TRACK[activeTrack].map((program) => {
							const isActive = activeProgram === program.id
							return (
								<button
									key={program.id}
									type="button"
									onClick={() => setActiveProgram(program.id)}
									className={`rounded-full px-4 py-2 text-sm font-medium transition-colors border ${
										isActive
											? 'bg-slate-900 text-white border-slate-900 dark:bg-slate-100 dark:text-slate-900 dark:border-slate-100'
											: 'bg-transparent text-slate-700 border-slate-300 hover:border-slate-400 dark:text-slate-300 dark:border-slate-600 dark:hover:border-slate-500'
									}`}
								>
									{program.name}
								</button>
							)
						})}
					</div>
				</div>

				{/* Course Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
					{currentCourses.map((course) => {
						const courseProgress = getCourseProgressPercentage(course)

						return (
						<Link
							key={course.id}
							to={`/course/${course.id}/overview`}
							className="group block bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm hover:shadow-md transition-all overflow-hidden"
						>
							<div className="h-40 relative overflow-hidden bg-slate-200 dark:bg-slate-800">
								<img
									src={course.image}
									alt={course.title}
									className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
							</div>
							<div className="p-5 border-t border-slate-200 dark:border-slate-800">
								<h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{course.title}</h2>
								<p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Instructor: {course.instructor.name}</p>
								<div className="mt-4">
									<div className="mb-1 flex items-center justify-between text-xs font-medium text-slate-600 dark:text-slate-400">
										<span>Progress</span>
										<span>{courseProgress}%</span>
									</div>
									<div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700">
										<div className="h-2 rounded-full bg-blue-600" style={{ width: `${courseProgress}%` }} />
									</div>
								</div>
								<div className="mt-4 flex items-center gap-2" onClick={(event) => event.preventDefault()}>
										<div className="group/tooltip relative">
											<button
												type="button"
												aria-label="Download syllabus"
												title="Download syllabus"
												className="rounded border border-slate-300 p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
											>
												<FiBook size={16} />
											</button>
											<span className="pointer-events-none absolute -top-10 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md border border-slate-200 bg-slate-950 px-2 py-1 text-xs font-medium text-white opacity-0 shadow-sm transition-opacity group-hover/tooltip:opacity-100 dark:border-slate-700 dark:bg-slate-100 dark:text-slate-900">
												Download syllabus
											</span>
										</div>
										<div className="group/tooltip relative">
											<button
												type="button"
												aria-label="Open global course forum"
												title="Open discussion forum"
												className="rounded border border-slate-300 p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
											>
												<FiUsers size={16} />
											</button>
											<span className="pointer-events-none absolute -top-10 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md border border-slate-200 bg-slate-950 px-2 py-1 text-xs font-medium text-white opacity-0 shadow-sm transition-opacity group-hover/tooltip:opacity-100 dark:border-slate-700 dark:bg-slate-100 dark:text-slate-900">
												Open discussion forum
											</span>
										</div>
										<div className="group/tooltip relative">
											<button
												type="button"
												aria-label="Open grades"
												title="View grades"
												className="rounded border border-slate-300 p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
											>
												<FiCheckSquare size={16} />
											</button>
											<span className="pointer-events-none absolute -top-10 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md border border-slate-200 bg-slate-950 px-2 py-1 text-xs font-medium text-white opacity-0 shadow-sm transition-opacity group-hover/tooltip:opacity-100 dark:border-slate-700 dark:bg-slate-100 dark:text-slate-900">
												View grades
											</span>
										</div>
								</div>
							</div>
						</Link>
						)
					})}
				</div>
			</div>

			{/* RIGHT PANE: Sidebar Hub (30%) */}
			<aside className="w-full lg:w-[30%] p-4 sm:p-6 lg:p-10 bg-slate-50/50 dark:bg-slate-900/20 lg:overflow-y-auto border-t lg:border-t-0 border-slate-200 dark:border-slate-800 flex flex-col gap-8">
				{/* Calendar Section */}
				<div className="pb-8 border-b border-slate-200 dark:border-slate-800">
					<h3 className="text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-slate-100 mb-4">Academic Calendar</h3>
					<div className="bg-white dark:bg-slate-900/50 rounded-lg p-3 sm:p-4 border border-slate-200 dark:border-slate-800">
						<Calendar
							onChange={setCalendarDate}
							value={calendarDate}
							tileClassName={() => 'relative'}
							tileContent={({ date, view }) =>
								view === 'month' && hasEventOnDate(date) ? (
									<div className="w-1.5 h-1.5 bg-blue-500 rounded-full absolute bottom-1 left-1/2 transform -translate-x-1/2" />
								) : null
							}
						/>
					</div>
				</div>

				{/* Deadlines Section */}
				<div className="pb-8 border-b border-slate-200 dark:border-slate-800">
					<h3 className="text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-slate-100 mb-3">Upcoming Deadlines</h3>
					<ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
						{visibleMonthEvents.length > 0 ? (
							visibleMonthEvents.map((event) => (
								<li key={event.id} className="flex gap-2">
									<span className="flex-shrink-0 text-blue-600 dark:text-blue-400">●</span>
									<div>
										<p className="font-medium text-slate-900 dark:text-slate-100">{event.title}</p>
										<p className="text-xs text-slate-600 dark:text-slate-400">{event.date.toLocaleDateString()}</p>
									</div>
								</li>
							))
						) : (
							<li className="text-slate-500 dark:text-slate-400 italic">No deadlines in selected month.</li>
						)}
					</ul>
				</div>

				{/* Resources Section */}
				<div>
					<h3 className="text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-slate-100 mb-4">Resources & Links</h3>
					<ul className="space-y-3">
						<li>
							<a
								href={libraryUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center justify-between text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
							>
								<span>Debutron eLibrary</span>
								<FiExternalLink size={16} />
							</a>
						</li>
						<li>
							<a
								href="https://www.datacamp.com"
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center justify-between text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
							>
								<span>DataCamp</span>
								<FiExternalLink size={16} />
							</a>
						</li>
						<li>
							<a
								href="https://cs50.harvard.edu"
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center justify-between text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
							>
								<span>CS50 (Harvard)</span>
								<FiExternalLink size={16} />
							</a>
						</li>
						<li>
							<a
								href="https://www.wqu.edu"
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center justify-between text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
							>
								<span>WorldQuant University</span>
								<FiExternalLink size={16} />
							</a>
						</li>
					</ul>
				</div>
			</aside>
		</div>
	)
}

export default LMSDashboard
