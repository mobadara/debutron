import { Link, useOutletContext } from 'react-router-dom'

function StudentDashboard() {
	const { activeTrack, user } = useOutletContext()

	return (
		<div className="max-w-7xl mx-auto">
			<section className="grid grid-cols-1 gap-6 mb-10 md:grid-cols-3">
				<article className="border-t-4 border-blue-500 bg-white p-6 shadow-sm">
					<h3 className="mb-4 font-serif text-xl font-semibold text-debutron-navy">
						{activeTrack === 'A' ? 'Academic Progress' : 'Tech Progress'}
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
						<li>Primary Style: Visual-Spatial</li>
						<li>Pacing: Accelerated</li>
						<li>Focus Mode: High Contrast Enabled</li>
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

			{activeTrack === 'A' && !user.enrolled_tracks.includes('T') && (
				<section>
					<div className="bg-slate-900 text-white p-6 rounded-sm mt-8 relative overflow-hidden border-l-8 border-yellow-400">
						<span className="absolute right-4 top-4 bg-yellow-400 text-slate-900 text-xs font-bold px-2 py-1 uppercase tracking-wider">
							Alumni Benefit
						</span>

						<h3 className="text-2xl font-serif font-bold mb-2">Ready for the Tech Innovation Track?</h3>
						<p className="text-slate-300 text-sm md:text-base mb-6 max-w-2xl">
							Now that you are advancing in your academic journey, take the next step. Apply for the Tech Track at an exclusive 50% Alumni discount (₦5,000) without re-entering your details.
						</p>

						<Link
							to="/student/transition-tech"
							className="bg-yellow-400 text-slate-900 px-6 py-3 font-bold uppercase tracking-wide hover:bg-yellow-300 transition-colors inline-block"
						>
							Start Tech Transition
						</Link>
					</div>
				</section>
			)}
		</div>
	)
}

export default StudentDashboard