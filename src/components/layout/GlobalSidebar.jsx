import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
	FiChevronDown,
	FiLock,
	FiCheck,
	FiHome,
	FiBook,
	FiCalendar,
	FiAward,
	FiCreditCard,
	FiSettings,
	FiBookOpen,
	FiBriefcase,
	FiX,
} from 'react-icons/fi'
import DebutronLogo from '../DebutronLogo'

const navItemClass = 'flex items-center gap-3 rounded-sm px-3 py-2 text-sm font-semibold transition-colors'
const focusRingClass = 'focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:bg-slate-100 dark:focus:bg-slate-800 rounded-sm transition-all'

const academicProgramIds = ['o-level', 'utme', 'a-level']
const techProgramIds = ['data-science', 'data-analytics', 'cloud', 'cyber', 'fullstack']

function GlobalSidebar({ activeTrack, setActiveTrack, activeProgram, setActiveProgram, user, programNames, isOpen = true, setIsOpen = () => {} }) {
	const location = useLocation()
	const [isTrackMenuOpen, setIsTrackMenuOpen] = useState(false)
	const [isProgramMenuOpen, setIsProgramMenuOpen] = useState(false)
	const lastProgramByTrackRef = useRef({})

	const getProgramsForTrack = (track) =>
		(user?.enrolled_programs || []).filter((programId) =>
			track === 'A' ? academicProgramIds.includes(programId) : techProgramIds.includes(programId)
		)

	const isActive = (path) =>
		location.pathname.includes(path)
			? 'bg-blue-50 text-blue-700 border-r-4 border-blue-700 dark:bg-blue-900/30 dark:text-blue-200'
			: 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'

	const trackPrograms = getProgramsForTrack(activeTrack)

	useEffect(() => {
		if (!activeProgram) return
		if (trackPrograms.includes(activeProgram)) {
			lastProgramByTrackRef.current[activeTrack] = activeProgram
		}
	}, [activeProgram, activeTrack, trackPrograms])

	useEffect(() => {
		if (trackPrograms.length === 0) return
		if (!trackPrograms.includes(activeProgram)) {
			const rememberedProgram = lastProgramByTrackRef.current[activeTrack]
			setActiveProgram(
				rememberedProgram && trackPrograms.includes(rememberedProgram)
					? rememberedProgram
					: trackPrograms[0]
			)
		}
	}, [activeProgram, setActiveProgram, trackPrograms])

	return (
		<>
			<aside className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 h-full flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
				<div className="p-6 border-b border-slate-200 dark:border-slate-700 mb-4">
					<div className="flex items-start justify-between">
						<DebutronLogo className="w-10 h-10" />
						<button onClick={() => setIsOpen(false)} className={`md:hidden p-2 text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md ${focusRingClass}`} type="button" aria-label="Close sidebar">
							<FiX className="h-6 w-6" />
						</button>
					</div>
				</div>

			<div className="relative px-4 mb-2">
				<button
					type="button"
					onClick={() => setIsTrackMenuOpen((prev) => !prev)}
					aria-expanded={isTrackMenuOpen}
					aria-haspopup="true"
					className={`w-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2 rounded-sm text-left flex items-center justify-between ${focusRingClass}`}
				>
					<div className="flex flex-col">
						<span className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400 font-bold">Workspace</span>
						<span className="text-sm font-bold text-slate-900 dark:text-slate-100">{activeTrack === 'A' ? 'Academic Track' : 'Tech Track'}</span>
					</div>
					<FiChevronDown className={`text-slate-500 dark:text-slate-400 transition-transform ${isTrackMenuOpen ? 'rotate-180' : ''}`} />
				</button>

				{isTrackMenuOpen && (
					<div className="absolute left-4 right-4 top-full mt-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-sm shadow-md z-30 overflow-hidden">
						{['A', 'T'].map((track) => {
							const isEnrolled = user?.enrolled_tracks?.includes(track)
							const trackLabel = track === 'A' ? 'Academic Track' : 'Tech Track'

							if (!isEnrolled) {
								return (
									<div
										key={track}
										className="px-3 py-2 text-sm text-slate-400 bg-slate-50 dark:bg-slate-800 cursor-not-allowed flex items-center justify-between"
									>
										<span>{trackLabel}</span>
										<FiLock />
									</div>
								)
							}

							return (
								<button
									key={track}
									type="button"
									onClick={() => {
										const nextPrograms = getProgramsForTrack(track)
										const rememberedProgram = lastProgramByTrackRef.current[track]
										setActiveTrack(track)
										if (nextPrograms.length > 0) {
											setActiveProgram(
												rememberedProgram && nextPrograms.includes(rememberedProgram)
													? rememberedProgram
													: nextPrograms[0]
											)
										}
										setIsTrackMenuOpen(false)
										setIsProgramMenuOpen(false)
										setIsOpen(false)
									}}
									className={`w-full px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between ${focusRingClass}`}
								>
									<span>{trackLabel}</span>
									{activeTrack === track && <FiCheck className="text-green-600" />}
								</button>
							)
						})}
					</div>
				)}
			</div>

			<div className="relative px-4 mb-2">
				<button
					type="button"
					onClick={() => setIsProgramMenuOpen((prev) => !prev)}
					className={`w-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 rounded-sm text-left flex items-center justify-between ${focusRingClass}`}
				>
					<span className="text-sm text-slate-700 dark:text-slate-200 font-semibold">Program: {programNames?.[activeProgram] || 'Select Program'}</span>
					<FiChevronDown className={`text-slate-500 dark:text-slate-400 transition-transform ${isProgramMenuOpen ? 'rotate-180' : ''}`} />
				</button>

				{isProgramMenuOpen && (
					<div className="absolute left-4 right-4 top-full mt-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-sm shadow-md z-20 overflow-hidden">
						{trackPrograms.map((programId) => (
							<button
								key={programId}
								type="button"
								onClick={() => {
									setActiveProgram(programId)
									setIsProgramMenuOpen(false)
									setIsOpen(false)
								}}
								className={`w-full px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between ${focusRingClass}`}
							>
								<span>{programNames?.[programId] || programId}</span>
								{activeProgram === programId && <FiCheck className="text-green-600" />}
							</button>
						))}
					</div>
				)}
			</div>

			<nav className="flex-1 px-4 mt-6 space-y-1 overflow-y-auto" aria-label="Main Portal Navigation">
				<Link to="/student/dashboard" onClick={() => setIsOpen(false)} className={`${navItemClass} ${focusRingClass} ${isActive('/student/dashboard')}`}>
					<FiHome />
					<span>Dashboard</span>
				</Link>
				<Link to="/student/courses" onClick={() => setIsOpen(false)} className={`${navItemClass} ${focusRingClass} ${isActive('/student/courses')}`}>
					<FiBook />
					<span>Courses</span>
				</Link>
				<Link to="/student/transcript" onClick={() => setIsOpen(false)} className={`${navItemClass} ${focusRingClass} ${isActive('/student/transcript')}`}>
					<FiAward />
					<span>Transcript</span>
				</Link>
				<Link to="/student/calendar" onClick={() => setIsOpen(false)} className={`${navItemClass} ${focusRingClass} ${isActive('/student/calendar')}`}>
					<FiCalendar />
					<span>Calendar</span>
				</Link>
				<Link to="/student/tuition" onClick={() => setIsOpen(false)} className={`${navItemClass} ${focusRingClass} ${isActive('/student/tuition')}`}>
					<FiCreditCard className="text-lg" />
					<span>Finance & Tuition</span>
				</Link>

				<div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700">
					<p className="mb-2 text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500 font-bold">
						{activeTrack === 'A' ? 'Academic Resources' : 'Tech Resources'}
					</p>

					{activeTrack === 'A' && (
						<Link to="/student/university-admissions" onClick={() => setIsOpen(false)} className={`${navItemClass} ${focusRingClass} ${isActive('/student/university-admissions')}`}>
							<FiBookOpen />
							<span>University Admissions</span>
						</Link>
					)}

					{activeTrack === 'T' && (
						<Link to="/student/careers" onClick={() => setIsOpen(false)} className={`${navItemClass} ${focusRingClass} ${isActive('/student/careers')}`}>
							<FiBriefcase />
							<span>Career Hub</span>
						</Link>
					)}
				</div>
			</nav>

			<div className="p-4 border-t border-slate-200 dark:border-slate-700">
				<Link to="/student/settings" onClick={() => setIsOpen(false)} className={`${navItemClass} ${focusRingClass} ${isActive('/student/settings')}`}>
					<FiSettings />
					<span><span className="sr-only">Open your profile and application </span>Settings</span>
				</Link>
			</div>
			</aside>

			{isOpen && (
				<div className="fixed inset-0 bg-slate-900/50 z-40 md:hidden" onClick={() => setIsOpen(false)} aria-hidden="true" />
			)}
		</>
	)
}

export default GlobalSidebar
