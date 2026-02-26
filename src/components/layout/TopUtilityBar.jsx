import { Link } from 'react-router-dom'

function TopUtilityBar() {
	return (
		<div className="relative z-[1200] bg-debutron-navy px-6 py-2 font-sans text-sm text-white">
			<div className="mx-auto flex max-w-7xl items-center justify-end gap-5">
				<Link className="font-bold transition-colors duration-200 hover:text-gray-300" to="/admissions">
					Apply Now
				</Link>
				<div className="group relative">
					<button
						type="button"
						className="inline-flex items-center gap-1 transition-colors duration-200 hover:text-gray-300"
					>
						Portals
						<span aria-hidden="true">▾</span>
					</button>
					<div className="invisible absolute top-full right-0 mt-2 z-20 w-max max-w-[90vw] rounded border border-white/20 bg-debutron-navy/95 p-1 opacity-0 shadow-lg transition-all duration-150 group-hover:visible group-hover:opacity-100 sm:max-w-md md:right-auto md:left-0">
						<a className="block rounded px-3 py-2 text-sm text-white transition-colors duration-200 hover:bg-white/10 hover:text-gray-300" href="#">
							Student
						</a>
						<a className="block rounded px-3 py-2 text-sm text-white transition-colors duration-200 hover:bg-white/10 hover:text-gray-300" href="#">
							Staff
						</a>
					</div>
				</div>
				<a
					className="transition-colors duration-200 hover:text-gray-300"
					href="https://outlook.office.com"
					target="_blank"
					rel="noopener noreferrer"
				>
					Staff Mail
				</a>
			</div>
		</div>
	)
}

export default TopUtilityBar
