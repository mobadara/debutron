import { useState } from 'react'

const CORE_LINKS = [
	'Course Welcome Page',
	'Syllabus and Grading',
	'Meet your Instructors',
]

const MODULES = [
	...Array.from({ length: 8 }, (_, index) => `Module ${index + 1}`),
	'Module 9: Final Project & Deadlines',
]

const createWeekRange = (start, end) =>
	Array.from({ length: end - start + 1 }, (_, index) => start + index)

const PHASE_ONE_WEEKS = createWeekRange(1, 16)
const PHASE_TWO_WEEKS = createWeekRange(17, 24)

function CourseSidebar({
	courseTitle,
	trackType,
	academicLevel,
}) {
	const [activeTerm, setActiveTerm] = useState(1)
	const [phaseOneOpen, setPhaseOneOpen] = useState(true)
	const [phaseTwoOpen, setPhaseTwoOpen] = useState(false)

	const isAcademicTrack = trackType === 'A'
	const isTechTrack = trackType === 'T'
	const isALevel = isAcademicTrack && academicLevel === 'A-Level'

	const termLabel = activeTerm === 1 ? 'Term 1 (AS Level)' : 'Term 2 (A2 Level)'

	return (
		<aside className="w-full rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
			<h2 className="text-lg font-semibold text-slate-900">{courseTitle}</h2>

			{isALevel ? (
				<div className="mt-3">
					<p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
						Select A-Level Term
					</p>
					<div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-1">
						<button
							type="button"
							onClick={() => setActiveTerm(1)}
							className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
								activeTerm === 1
									? 'bg-white text-slate-900 shadow-sm'
									: 'text-slate-600 hover:text-slate-800'
							}`}
						>
							Term 1 (AS Level)
						</button>
						<button
							type="button"
							onClick={() => setActiveTerm(2)}
							className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
								activeTerm === 2
									? 'bg-white text-slate-900 shadow-sm'
									: 'text-slate-600 hover:text-slate-800'
							}`}
						>
							Term 2 (A2 Level)
						</button>
					</div>
				</div>
			) : null}

			<nav className="mt-4 space-y-6">
				<section>
					<p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
						Core Links
					</p>
					<ul className="space-y-1.5 text-sm text-slate-700">
						{CORE_LINKS.map((link) => (
							<li key={link}>
								<button
									type="button"
									className="w-full rounded-md px-2 py-1.5 text-left transition-colors hover:bg-slate-50 hover:text-slate-900"
								>
									{link}
								</button>
							</li>
						))}
					</ul>
				</section>

				{isTechTrack ? (
					<section>
						<p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
							Innovation Lab (9 Modules)
						</p>
						<ul className="space-y-1.5 text-sm text-slate-700">
							{MODULES.map((moduleName) => (
								<li key={moduleName}>
									<button
										type="button"
										className="w-full rounded-md px-2 py-1.5 text-left transition-colors hover:bg-slate-50 hover:text-slate-900"
									>
										{moduleName}
									</button>
								</li>
							))}
						</ul>
					</section>
				) : null}

				{isAcademicTrack ? (
					<section>
						<div className="mb-2">
							<p className="text-xs font-medium uppercase tracking-wide text-slate-500">
								Pre-University Track (24 Weeks)
							</p>
							<p className="mt-1 text-xs text-slate-500">
								{isALevel ? `${termLabel} • 6-month term structure` : '1 term • 6-month term structure'}
							</p>
						</div>

						<div className="space-y-2">
							<details
								open={phaseOneOpen}
								onToggle={(event) => setPhaseOneOpen(event.currentTarget.open)}
								className="rounded-lg border border-slate-200 bg-slate-50"
							>
								<summary className="cursor-pointer list-none px-3 py-2 text-sm font-medium text-slate-800">
									Phase 1: Thorough Teaching (Weeks 1-16)
								</summary>
								<ul className="space-y-1 px-3 pb-3 text-sm text-slate-700">
									{PHASE_ONE_WEEKS.map((week) => (
										<li key={`phase-one-week-${week}`} className="rounded-md bg-white px-2 py-1.5">
											Week {week}
										</li>
									))}
								</ul>
							</details>

							<details
								open={phaseTwoOpen}
								onToggle={(event) => setPhaseTwoOpen(event.currentTarget.open)}
								className="rounded-lg border border-slate-200 bg-slate-50"
							>
								<summary className="cursor-pointer list-none px-3 py-2 text-sm font-medium text-slate-800">
									Phase 2: Exam Practicing (Weeks 17-24)
								</summary>
								<ul className="space-y-1 px-3 pb-3 text-sm text-slate-700">
									{PHASE_TWO_WEEKS.map((week) => {
										const isCbtMockWeek = week >= 21

										return (
											<li
												key={`phase-two-week-${week}`}
												className={`rounded-md px-2 py-1.5 ${
													isCbtMockWeek
														? 'border border-emerald-200 bg-emerald-50 text-emerald-800'
														: 'bg-white'
												}`}
											>
												Week {week}
												{isCbtMockWeek ? ' • CBT Mock Exam Focus' : ''}
											</li>
										)
									})}
								</ul>
							</details>
						</div>
					</section>
				) : null}
			</nav>
		</aside>
	)
}

export default CourseSidebar
