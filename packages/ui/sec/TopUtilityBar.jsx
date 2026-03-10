import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMoon, FiPause, FiPlay, FiSquare, FiSun, FiZoomIn, FiZoomOut } from 'react-icons/fi'
import { useA11y } from './A11yContext'
import { useNarrator } from './useNarrator'

function TopUtilityBar({ showUtilityLinks = true, topUtilityData = null }) {
	const { isDarkMode, setIsDarkMode, textScale, setTextScale } = useA11y()
	const { isSpeaking, isPaused, readContent, pauseNarrator, stopNarrator } = useNarrator()
	const [isPortalsOpen, setIsPortalsOpen] = useState(false)
	const portalsMenuRef = useRef(null)

	useEffect(() => {
		if (!isPortalsOpen) {
			return
		}

		const handlePointerDown = (event) => {
			if (portalsMenuRef.current?.contains(event.target)) {
				return
			}

			setIsPortalsOpen(false)
		}

		document.addEventListener('pointerdown', handlePointerDown)

		return () => {
			document.removeEventListener('pointerdown', handlePointerDown)
		}
	}, [isPortalsOpen])

	return (
		<div className="bg-slate-900 dark:bg-black text-white px-6 py-2 flex justify-between items-center text-sm z-[2000] relative overflow-visible">
			<a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:bg-slate-200 focus:text-slate-900 focus:p-2 focus:z-50 font-bold">
				Skip to main content
			</a>

			{showUtilityLinks && topUtilityData ? (
				<div className="flex items-center gap-5">
					<Link className="font-bold transition-colors duration-200 hover:text-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 rounded-sm" to={topUtilityData.applyNow.to}>
						{topUtilityData.applyNow.label}
					</Link>
					<div
						ref={portalsMenuRef}
						className="group relative z-[2200]"
						onMouseEnter={() => setIsPortalsOpen(true)}
						onMouseLeave={() => setIsPortalsOpen(false)}
						onFocus={() => setIsPortalsOpen(true)}
						onBlur={(event) => {
							if (event.currentTarget.contains(event.relatedTarget)) {
								return
							}

							setIsPortalsOpen(false)
						}}
					>
						<button
							type="button"
							onClick={() => setIsPortalsOpen((prev) => !prev)}
							aria-expanded={isPortalsOpen}
							aria-haspopup="menu"
							className="inline-flex items-center gap-1 transition-colors duration-200 hover:text-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 rounded-sm"
						>
							Portals
							<span aria-hidden="true">▾</span>
						</button>
						<div className={`absolute top-full right-0 z-[2300] pt-2 w-max max-w-[90vw] sm:max-w-md md:right-auto md:left-0 ${isPortalsOpen ? 'block' : 'hidden'}`}>
							<div className="rounded border border-white/20 bg-slate-900/95 dark:bg-black/95 p-1 shadow-lg">
							{topUtilityData.portals.map((portal) => (
								portal.href ? (
									<a
										key={portal.href}
										className="block rounded px-3 py-2 text-sm text-white transition-colors duration-200 hover:bg-white/10 hover:text-gray-300"
										href={portal.href}
										target={portal.newTab ? '_blank' : undefined}
										rel={portal.newTab ? 'noopener noreferrer' : undefined}
										onClick={() => setIsPortalsOpen(false)}
									>
										{portal.label}
									</a>
								) : (
									<Link
										key={portal.to}
										className="block rounded px-3 py-2 text-sm text-white transition-colors duration-200 hover:bg-white/10 hover:text-gray-300"
										to={portal.to}
										onClick={() => setIsPortalsOpen(false)}
									>
										{portal.label}
									</Link>
								)
							))}
							</div>
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
					onClick={readContent}
					aria-label={isSpeaking && isPaused ? 'Resume narrator' : 'Start narrator'}
					className="inline-flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 rounded-sm"
				>
					<FiPlay />
					<span className="hidden sm:inline">{isSpeaking && isPaused ? 'Resume' : 'Read Page'}</span>
				</button>

				<button
					type="button"
					onClick={pauseNarrator}
					disabled={!isSpeaking || isPaused}
					aria-label="Pause narrator"
					className="inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 rounded-sm"
				>
					<FiPause />
					<span className="hidden sm:inline">Pause</span>
				</button>

				<button
					type="button"
					onClick={stopNarrator}
					disabled={!isSpeaking && !isPaused}
					aria-label="Stop narrator"
					className="inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 rounded-sm"
				>
					<FiSquare />
					<span className="hidden sm:inline">Stop</span>
				</button>

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
					{textScale && (isDarkMode ? <FiSun /> : <FiMoon />)}
					<span className="hidden sm:inline">{isDarkMode ? 'Light Mode' : 'High Contrast Mode'}</span>
				</button>
			</div>
		</div>
	)
}

export default TopUtilityBar
