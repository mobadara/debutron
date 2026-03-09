import { Link, useOutletContext } from 'react-router-dom'
import { FiCalendar, FiLock, FiTarget, FiTrendingUp } from 'react-icons/fi'
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function StudentDashboard() {
	const { activeTrack, activeProgram, user, programNames } = useOutletContext()
	const isEligibleForTech = user.academic_status === 'Graduated' && user.has_university_admission === true
	const quizData = [
		{ week: 'Wk 1', score: 65 },
		{ week: 'Wk 2', score: 72 },
		{ week: 'Wk 3', score: 85 },
		{ week: 'Wk 4', score: 78 },
		{ week: 'Wk 5', score: 90 },
	]
	const projectData = [
		{ module: 'Python Basics', score: 95 },
		{ module: 'Data Wrangling', score: 88 },
		{ module: 'EDA & Viz', score: 92 },
		{ module: 'Machine Learning', score: 80 },
	]

	return (
		<div className="max-w-7xl mx-auto">
			<header className="bg-debutron-navy bg-gradient-to-r from-slate-900 to-blue-900 text-white rounded-lg p-8 mb-8 shadow-md relative overflow-hidden">
				<h2 className="text-3xl md:text-4xl font-serif font-bold mb-2">Welcome back, {user.firstName} {user.lastName || 'Obadara'}.</h2>

				<div className="flex flex-wrap gap-6 mt-6 text-sm md:text-base text-slate-200">
					<div className="inline-flex items-center gap-2">
						<FiTarget />
						<span>Program: {programNames?.[activeProgram] || '—'}</span>
					</div>
					<div className="inline-flex items-center gap-2">
						<FiCalendar />
						<span>{activeTrack === 'A' ? 'Track: Pre-University Studies' : 'Track: Innovation Lab'}</span>
					</div>
					<div className="inline-flex items-center gap-2">
						<FiTrendingUp />
						<span>Status: Active &amp; On Track</span>
					</div>
				</div>
			</header>

			<section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
				<article className="border-t-4 border-blue-500 bg-white p-6 shadow-sm">
					<h3 className="mb-4 font-serif text-xl font-semibold text-debutron-navy">
						{activeTrack === 'A' ? 'Pre-University Progress' : 'Innovation Lab Progress'}
					</h3>
					<p className="mb-2 text-sm text-gray-600">
						{activeTrack === 'A' ? 'Course Completion' : 'Module Completion'}
					</p>
					<div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
						<div className="h-full rounded-full bg-blue-500" style={{ width: '68%' }} />
					</div>
					<p className="mt-2 text-sm font-medium text-gray-700">68% complete</p>
				</article>

				<article className="border-t-4 border-purple-500 bg-white p-6 shadow-sm">
					<h3 className="mb-4 font-serif text-xl font-semibold text-debutron-navy">AI Learning Profile</h3>
					<ul className="space-y-2 text-sm text-gray-700">
						<li>Visual-Spatial</li>
						<li>Accelerated Pacing</li>
					</ul>
				</article>

				<article className="border-t-4 border-amber-500 bg-white p-6 shadow-sm">
					<h3 className="mb-4 font-serif text-xl font-semibold text-debutron-navy">Next Assessment</h3>
					<p className="text-sm text-gray-700">
						{activeTrack === 'A' ? 'Next Course Assessment' : 'Next Module Project'}
					</p>
					<p className="mt-2 text-sm font-medium text-amber-700">Happening in 3 days</p>
				</article>
			</section>

			{activeTrack === 'A' && (
				<section className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm mb-10">
					<h3 className="font-serif text-xl font-bold text-slate-900 mb-1">Pre-University Trajectory</h3>
					<p className="text-sm text-slate-500 mb-6">Weekly Quiz Evaluation</p>

					<ResponsiveContainer width="100%" height={300}>
						<LineChart data={quizData}>
							<CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
							<XAxis dataKey="week" stroke="#64748b" fontSize={12} tickLine={false} />
							<YAxis stroke="#64748b" fontSize={12} tickLine={false} domain={[0, 100]} />
							<Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
							<Line type="monotone" dataKey="score" stroke="#2563eb" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
						</LineChart>
					</ResponsiveContainer>
				</section>
			)}

			{activeTrack === 'T' && (
				<section className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm mb-10">
					<h3 className="font-serif text-xl font-bold text-slate-900 mb-1">Module Project Performance</h3>
					<p className="text-sm text-slate-500 mb-6">Evaluation across completed Innovation Lab milestones.</p>

					<ResponsiveContainer width="100%" height={300}>
						<BarChart data={projectData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
							<CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
							<XAxis dataKey="module" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
							<YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
							<Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
							<Bar dataKey="score" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={50} />
						</BarChart>
					</ResponsiveContainer>
				</section>
			)}

			{activeTrack === 'A' && !user.enrolled_tracks.includes('T') && (
				<section>
					<div className="bg-slate-900 text-white p-6 md:p-8 rounded-sm mt-8 relative border-l-8 border-yellow-400">
						<span className="absolute right-4 top-4 bg-yellow-400 text-slate-900 text-xs font-bold px-2 py-1 rounded">
							Alumni Benefit
						</span>

						<h3 className="text-2xl font-serif font-bold mb-2">Ready for the Innovation Lab?</h3>
						<p className="text-slate-300 text-sm md:text-base mb-6 max-w-2xl">
							Now that you are advancing in your academic journey, take the next step. Alumni get a 50% discount on Tech Innovation Track enrollment (₦5,000).
						</p>

						{isEligibleForTech ? (
							<Link
								to="/transition-tech"
								className="bg-yellow-400 text-slate-900 font-bold px-8 py-4 inline-block"
							>
								Unlock Innovation Lab -&gt;
							</Link>
						) : (
							<>
								<button
									type="button"
									disabled
									className="bg-slate-800 text-slate-400 cursor-not-allowed px-8 py-4 inline-flex items-center gap-2"
								>
									<FiLock />
									University Admission Required
								</button>
								<p className="mt-3 text-xs text-slate-300">
									You must graduate and upload your university admission letter to unlock the Tech transition benefit.
								</p>
							</>
						)}
					</div>
				</section>
			)}

			{activeTrack === 'T' && (
				<section className="mt-8">
					<h3 className="text-xl font-serif font-bold text-slate-900 mb-4">Tech Partners</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<a
							href="https://www.datacamp.com"
							target="_blank"
							rel="noreferrer"
							className="bg-white border border-slate-200 p-4 rounded-sm text-slate-700 hover:bg-slate-50"
						>
							DataCamp Portal
						</a>
						<a
							href="https://cs50.harvard.edu"
							target="_blank"
							rel="noreferrer"
							className="bg-white border border-slate-200 p-4 rounded-sm text-slate-700 hover:bg-slate-50"
						>
							Harvard CS50 Workspace
						</a>
					</div>
				</section>
			)}
		</div>
	)
}

export default StudentDashboard