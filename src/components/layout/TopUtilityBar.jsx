import { Link } from 'react-router-dom'
import { FiMoon, FiSun, FiZoomIn, FiZoomOut } from 'react-icons/fi'
import { useA11y } from '../../context/A11yContext'
import { topUtilityData } from '../../data/domains/marketingContent'

function TopUtilityBar({ showUtilityLinks = true }) {
	const { isDarkMode, setIsDarkMode, textScale, setTextScale } = useA11y()

	return (
		<div className="bg-slate-900 dark:bg-black text-white px-6 py-2 flex justify-between items-center text-sm z-[1100] relative">
			<a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:bg-slate-200 focus:text-slate-900 focus:p-2 focus:z-50 font-bold">Skip to main content</a>

			{showUtilityLinks ? (
				<div className="flex items-center gap-5">
					<Link className="font-bold transition-colors duration-200 hover:text-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 rounded-sm" to={topUtilityData.applyNow.to}>
						{topUtilityData.applyNow.label}
					</Link>
					<div className="group relative z-[1200]">
						<button
							type="button"
							className="inline-flex items-center gap-1 transition-colors duration-200 hover:text-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 rounded-sm"
						>
							Portals
							<span aria-hidden="true">▾</span>
						</button>
						<div className="invisible absolute top-full right-0 z-[1200] mt-2 w-max max-w-[90vw] rounded border border-white/20 bg-slate-900/95 dark:bg-black/95 p-1 opacity-0 shadow-lg transition-all duration-150 group-hover:visible group-hover:opacity-100 sm:max-w-md md:right-auto md:left-0">
							{topUtilityData.portals.map((portal) => (
								<Link key={portal.to} className="block rounded px-3 py-2 text-sm text-white transition-colors duration-200 hover:bg-white/10 hover:text-gray-300" to={portal.to}>
									{portal.label}
								</Link>
							))}
						</div>
					</div>
					<a
						className="transition-colors duration-200 hover:text-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 rounded-sm"
						href={topUtilityData.staffMail.href}
						target="_blank"
						rel="noopener noreferrer"
					>
						{topUtilityData.staffMail.label}
					</a>
				</div>
			) : (
				<div aria-hidden="true" />
			)}

			<div className="flex gap-4 items-center">
				<button
					type="button"
					onClick={() => setTextScale((prev) => (prev === 'normal' ? 'large' : 'xl'))}
					aria-label="Increase text size"
					className="inline-flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 rounded-sm"
				>
					<FiZoomIn />
					<span className="hidden sm:inline">Increase Text</span>
				</button>

				<button
					type="button"
					onClick={() => setTextScale('normal')}
					aria-label="Reset text size"
					className="inline-flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 rounded-sm"
				>
					<FiZoomOut />
					<span className="hidden sm:inline">Reset Text</span>
				</button>

				<button
					type="button"
					onClick={() => setIsDarkMode(!isDarkMode)}
					aria-pressed={isDarkMode}
					className="inline-flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 rounded-sm"
				>
					{isDarkMode ? <FiSun /> : <FiMoon />}
					<span>{isDarkMode ? 'Light Mode' : 'High Contrast Mode'}</span>
				</button>
			</div>
		</div>
	)
}

export default TopUtilityBar
