import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiCheck, FiChevronDown, FiLock } from 'react-icons/fi'

const baseLinkClass = 'block rounded-sm px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors'

function GlobalSidebar({ activeTrack, setActiveTrack, user }) {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)

	const isAcademic = user.enrolled_tracks.includes('A')
	const isTech = user.enrolled_tracks.includes('T')

	return (
		<aside className="w-64 bg-white border-r border-slate-200 h-full flex flex-col">
			<div className="px-4 pt-6 pb-4 border-b border-slate-100">
				<p className="font-serif text-xl font-bold text-slate-900">Debutron Lab.</p>
			</div>

			<div className="relative px-4 mb-6 mt-4">
				<button
					type="button"
					onClick={() => setIsDropdownOpen((prev) => !prev)}
					className="w-full bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-md p-3 flex justify-between items-center transition-colors text-left"
				>
					<div className="flex flex-col">
						<span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Current Workspace</span>
						<span className="text-sm font-bold text-slate-900">{activeTrack === 'A' ? 'Academic Track' : 'Tech Innovation'}</span>
					</div>
					<FiChevronDown className={`text-slate-600 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
				</button>

				{isDropdownOpen && (
					<ul className="absolute top-full left-4 right-4 mt-1 bg-white border border-slate-200 shadow-lg rounded-md z-50 overflow-hidden">
						{isAcademic ? (
							<li>
								<button
									type="button"
									onClick={() => {
										setActiveTrack('A')
										setIsDropdownOpen(false)
									}}
									className="w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center justify-between"
								>
									<span>Academic Track</span>
									{activeTrack === 'A' && <FiCheck className="text-green-600" />}
								</button>
							</li>
						) : (
							<li className="px-3 py-2 text-sm text-slate-500 opacity-50 cursor-not-allowed flex items-center justify-between">
								<span>Academic Track</span>
								<FiLock />
							</li>
						)}

						{isTech ? (
							<li>
								<button
									type="button"
									onClick={() => {
										setActiveTrack('T')
										setIsDropdownOpen(false)
									}}
									className="w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center justify-between"
								>
									<span>Tech Innovation Track</span>
									{activeTrack === 'T' && <FiCheck className="text-green-600" />}
								</button>
							</li>
						) : (
							<li className="px-3 py-2 text-sm text-slate-500 opacity-50 cursor-not-allowed flex items-center justify-between">
								<span>Tech Innovation Track</span>
								<FiLock />
							</li>
						)}
					</ul>
				)}
			</div>

			<nav className="px-4 pb-6">
				<div className="space-y-1">
					<Link to="/student/dashboard" className={baseLinkClass}>Dashboard</Link>
					<Link to="/student/courses" className={baseLinkClass}>Courses</Link>
					<Link to="/student/transcript" className={baseLinkClass}>Transcript</Link>
					<Link to="/student/settings" className={baseLinkClass}>Settings</Link>
				</div>

				<div className="mt-4 pt-4 border-t border-slate-100">
					<p className="text-xs font-bold uppercase text-slate-400 mb-2">
						{activeTrack === 'A' ? 'Academic Zone' : 'Tech Zone'}
					</p>

					{activeTrack === 'A' && (
						<Link to="/portal/university-admissions" className={baseLinkClass}>
							University Admissions
						</Link>
					)}

					{activeTrack === 'T' && (
						<Link to="/portal/careers" className={baseLinkClass}>
							Career & Graduation
						</Link>
					)}
				</div>
			</nav>
		</aside>
	)
}

export default GlobalSidebar
