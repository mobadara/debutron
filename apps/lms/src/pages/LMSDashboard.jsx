import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { FiBook, FiCheckSquare, FiExternalLink, FiUsers } from 'react-icons/fi'

const mockUser = {
	name: 'Muyiwa',
	id: 'DL-2026-8492',
	headshot: 'https://ui-avatars.com/api/?name=Muyiwa&background=0D8ABC&color=fff&size=128',
	enrolledTracks: ['tech', 'academic'],
	academicDetails: {
		session: '2026/2027',
		term: 'Term 1 (AS Level)',
	},
	techDetails: {
		cohort: '2026 Cohort 1',
		phase: 'Phase 1: Core Foundations',
	},
}

const trackLabels = {
	tech: 'Innovation Lab',
	academic: 'Pre-University Studies',
}

const mockPrograms = {
	tech: [
		{ id: 'p1', name: 'Data Science & AI' },
		{ id: 'p2', name: 'Full-Stack Engineering' },
	],
	academic: [
		{ id: 'p3', name: 'A-Levels (Science)' },
		{ id: 'p4', name: 'UTME Intensive' },
	],
}

const programCourses = {
	p1: [
		{
			name: 'Intro to Data Science',
			instructor: 'Instructor: Dr. A. Bello',
			progress: 45,
			image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
		},
		{
			name: 'AI Ethics & Governance',
			instructor: 'Instructor: M. Okafor',
			progress: 30,
			image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
		},
		{
			name: 'Applied Statistics Lab',
			instructor: 'Instructor: S. Danjuma',
			progress: 62,
			image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
		},
		{
			name: 'Capstone Planning Studio',
			instructor: 'Instructor: L. Yusuf',
			progress: 18,
			image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
		},
	],
	p2: [
		{
			name: 'Modern JavaScript Systems',
			instructor: 'Instructor: R. Ahmed',
			progress: 38,
			image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80',
		},
		{
			name: 'React Frontend Engineering',
			instructor: 'Instructor: T. Udo',
			progress: 54,
			image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
		},
		{
			name: 'Node API Architecture',
			instructor: 'Instructor: P. Musa',
			progress: 29,
			image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
		},
		{
			name: 'Deployment & DevOps Basics',
			instructor: 'Instructor: Y. Kabiru',
			progress: 15,
			image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80',
		},
	],
	p3: [
		{
			name: 'A-Level Physics: Mechanics',
			instructor: 'Instructor: E. Ojo',
			progress: 50,
			image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
		},
		{
			name: 'A-Level Chemistry: Bonding',
			instructor: 'Instructor: R. Abdullahi',
			progress: 33,
			image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
		},
		{
			name: 'A-Level Mathematics: Pure 1',
			instructor: 'Instructor: T. Ibrahim',
			progress: 47,
			image: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800&q=80',
		},
	],
	p4: [
		{
			name: 'UTME Mathematics Intensive',
			instructor: 'Instructor: K. Nwosu',
			progress: 56,
			image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
		},
		{
			name: 'UTME English Comprehension',
			instructor: 'Instructor: N. Akin',
			progress: 41,
			image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80',
		},
		{
			name: 'UTME Exam Strategy Clinic',
			instructor: 'Instructor: B. Olatunji',
			progress: 22,
			image: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=800&q=80',
		},
	],
}

const mockEvents = [
	{ date: new Date(2026, 2, 15), title: 'Data Science Project Due' },
	{ date: new Date(2026, 2, 20), title: 'UTME Mock Exam CBT' },
	{ date: new Date(2026, 2, 25), title: 'Live Guest Lecture' },
]

function LMSDashboard() {
	const [activeTrack, setActiveTrack] = useState(mockUser.enrolledTracks[0])
	const [activeProgram, setActiveProgram] = useState('p1')
	const [calendarDate, setCalendarDate] = useState(new Date())

	useEffect(() => {
		setActiveProgram(mockPrograms[activeTrack][0].id)
	}, [activeTrack])

	const currentCourses = programCourses[activeProgram] || []
	const libraryUrl = import.meta.env.VITE_LIBRARY_URL || '#'
	const enrollmentBadges =
		activeTrack === 'academic'
			? [
				{ label: 'Session', value: mockUser.academicDetails.session },
				{ label: 'Term', value: mockUser.academicDetails.term },
			]
			: [
				{ label: 'Cohort', value: mockUser.techDetails.cohort },
				{ label: 'Phase', value: mockUser.techDetails.phase },
			]

	const visibleMonthEvents = useMemo(() => {
		const selectedMonth = calendarDate.getMonth()
		const selectedYear = calendarDate.getFullYear()

 		return mockEvents.filter((event) => {
			const eventDate = event.date
			return eventDate.getMonth() === selectedMonth && eventDate.getFullYear() === selectedYear
		})
	}, [calendarDate])

	const hasEventOnDate = (date) =>
		mockEvents.some((event) =>
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
					<h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Welcome back, {mockUser.name}</h1>
					<div className="flex flex-wrap items-center gap-3 mt-2">
						<div className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full text-sm font-medium border border-slate-200 dark:border-slate-700">
							<span className="font-semibold">Student ID:</span> {mockUser.id}
						</div>
						{enrollmentBadges.map((badge) => (
							<div
								key={badge.label}
								className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full text-sm font-medium border border-slate-200 dark:border-slate-700"
							>
								<span className="font-semibold">{badge.label}:</span> {badge.value}
							</div>
						))}
					</div>
				</div>

				{/* Track Selector Tabs */}
				<div className="mb-8">
					{mockUser.enrolledTracks.length > 1 && (
						<div className="flex gap-0 border-b border-slate-200 dark:border-slate-800">
							{mockUser.enrolledTracks.map((track) => (
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
									{trackLabels[track]}
								</button>
							))}
						</div>
					)}

					{/* Program Pills */}
					<div className="mt-5 flex flex-wrap items-center gap-2">
						{mockPrograms[activeTrack].map((program) => {
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
					{currentCourses.map((course) => (
						<Link
							key={course.name}
							to={`/course/intro?track=${activeTrack}&program=${activeProgram}`}
							className="group block bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm hover:shadow-md transition-all overflow-hidden"
						>
							<div className="h-40 relative overflow-hidden bg-slate-200 dark:bg-slate-800">
								<img
									src={course.image}
									alt={course.name}
									className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
							</div>
							<div className="p-5 border-t border-slate-200 dark:border-slate-800">
								<h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{course.name}</h2>
								<p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{course.instructor}</p>
								<div className="mt-4">
									<div className="mb-1 flex items-center justify-between text-xs font-medium text-slate-600 dark:text-slate-400">
										<span>Progress</span>
										<span>{course.progress}%</span>
									</div>
									<div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700">
										<div className="h-2 rounded-full bg-blue-600" style={{ width: `${course.progress}%` }} />
									</div>
								</div>
								<div className="mt-4 flex items-center gap-2" onClick={(event) => event.preventDefault()}>
										<div className="group/tooltip relative">
											<button
												type="button"
												aria-label="Open syllabus"
												title="Open syllabus"
												className="rounded border border-slate-300 p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
											>
												<FiBook size={16} />
											</button>
											<span className="pointer-events-none absolute -top-10 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md border border-slate-200 bg-slate-950 px-2 py-1 text-xs font-medium text-white opacity-0 shadow-sm transition-opacity group-hover/tooltip:opacity-100 dark:border-slate-700 dark:bg-slate-100 dark:text-slate-900">
												Open syllabus
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
					))}
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
								<li key={`${event.title}-${event.date.toISOString()}`} className="flex gap-2">
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
