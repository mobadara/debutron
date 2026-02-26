import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { FiChevronDown, FiChevronRight, FiMenu, FiSearch, FiX } from 'react-icons/fi'
import DebutronLogo from '../DebutronLogo'

function Header() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
	const [activeDropdown, setActiveDropdown] = useState(null)
	const [isDesktopDropdownSuppressed, setIsDesktopDropdownSuppressed] = useState(false)
	const [searchQuery, setSearchQuery] = useState('')
	const desktopSearchRef = useRef(null)
	const mobileSearchRef = useRef(null)
	const mobileMenuRef = useRef(null)
	const mobileMenuToggleRef = useRef(null)
	const desktopDropdownTimerRef = useRef(null)
	const location = useLocation()

	const closeMenu = () => {
		setIsMobileMenuOpen(false)
		setActiveDropdown(null)
	}

	const toggleDropdown = (dropdownKey) => {
		setActiveDropdown((prev) => (prev === dropdownKey ? null : dropdownKey))
	}

	const suppressDesktopDropdown = () => {
		if (window.innerWidth < 840) {
			return
		}

		setIsDesktopDropdownSuppressed(true)
		if (desktopDropdownTimerRef.current) {
			window.clearTimeout(desktopDropdownTimerRef.current)
		}
		desktopDropdownTimerRef.current = window.setTimeout(() => {
			setIsDesktopDropdownSuppressed(false)
		}, 350)
	}

	const handleDesktopNavClickCapture = (event) => {
		if (!event.target.closest('a')) {
			return
		}

		suppressDesktopDropdown()
	}

	const handleMobileNavClickCapture = (event) => {
		if (!event.target.closest('a')) {
			return
		}

		closeMenu()
	}

	useEffect(() => {
		setIsMobileMenuOpen(false)
		setActiveDropdown(null)
		setIsDesktopDropdownSuppressed(false)
	}, [location.pathname])

	useEffect(() => {
		if (!isMobileMenuOpen) {
			return
		}

		const handlePointerDown = (event) => {
			const target = event.target
			if (mobileMenuRef.current?.contains(target) || mobileMenuToggleRef.current?.contains(target)) {
				return
			}

			closeMenu()
		}

		document.addEventListener('pointerdown', handlePointerDown)

		return () => {
			document.removeEventListener('pointerdown', handlePointerDown)
		}
	}, [isMobileMenuOpen])

	useEffect(() => {
		return () => {
			if (desktopDropdownTimerRef.current) {
				window.clearTimeout(desktopDropdownTimerRef.current)
			}
		}
	}, [])

	return (
		<header className="site-header">
			<div className="nav-bar">
				{/* NEW SVG LOGO */}
				<Link to="/" className="flex items-center hover:opacity-90 transition-opacity">
  					<DebutronLogo className="w-10 h-10 md:w-12 md:h-12" />
				</Link>

				<div className="flex items-center gap-2 md:hidden">
					<div
						className="relative flex items-center"
						onClick={() => mobileSearchRef.current?.focus()}
						role="search"
					>
						<FiSearch className="pointer-events-none absolute left-2 z-10 text-xl text-debutron-navy" aria-hidden="true" />
						<input
							ref={mobileSearchRef}
							type="text"
							placeholder="Search..."
							value={searchQuery}
							onChange={(event) => setSearchQuery(event.target.value)}
							className="pl-10 pr-4 py-2 rounded-full border border-transparent bg-transparent w-10 focus:w-44 focus:bg-gray-100 focus:border-gray-300 focus:outline-none transition-all duration-300 ease-in-out cursor-pointer focus:cursor-text font-sans text-sm"
						/>
					</div>
					<button
						type="button"
						aria-label="Toggle navigation menu"
						ref={mobileMenuToggleRef}
						onClick={() => setIsMobileMenuOpen((prev) => !prev)}
					>
						{isMobileMenuOpen ? <FiX className="text-2xl text-debutron-navy" aria-hidden="true" /> : <FiMenu className="text-2xl text-debutron-navy" aria-hidden="true" />}
					</button>
				</div>

				<nav className={`desktop-nav ${isDesktopDropdownSuppressed ? 'desktop-nav--suppressed' : ''}`} aria-label="Primary navigation" onClickCapture={handleDesktopNavClickCapture}>
					<ul>
						<li className="has-dropdown">
							<span className="nav-label font-serif text-debutron-navy">About Us</span>
							<ul className="dropdown">
								<li>
									<Link className="font-sans text-debutron-charcoal" to="/about">Our Story</Link>
								</li>
								<li>
									<Link className="font-sans text-debutron-charcoal" to="/who-we-are">Vision &amp; Core Values</Link>
								</li>
								<li>
									<Link className="font-sans text-debutron-charcoal" to="/leadership">Leadership &amp; Teaching Team</Link>
								</li>
								<li>
									<Link className="font-sans text-debutron-charcoal" to="/innovation-lab">The Innovation Lab (Facilities)</Link>
								</li>
								<li>
									<Link className="font-sans text-debutron-charcoal" to="/accreditations-partnerships">Accreditations &amp; Partnerships</Link>
								</li>
								<li>
									<Link className="font-sans text-debutron-charcoal" to="/careers">Careers</Link>
								</li>
							</ul>
						</li>
						<li className="has-dropdown">
							<span className="nav-label font-serif text-debutron-navy">Innovations</span>
							<ul className="dropdown">
								<li>
									<Link className="font-sans text-debutron-charcoal" to="/ai-data-models">AI &amp; Data Models</Link>
								</li>
								<li>
									<Link className="font-sans text-debutron-charcoal" to="/enterprise-consulting">Enterprise Consulting</Link>
								</li>
								<li>
									<Link className="font-sans text-debutron-charcoal" to="/student-showcase">Student App Showcase</Link>
								</li>
							</ul>
						</li>
						<li className="has-dropdown relative">
							<span className="nav-label font-serif text-debutron-navy">Programs</span>
							<div className="dropdown mega-dropdown absolute top-full right-0 w-max max-w-[90vw] lg:max-w-none">
								<div className="dropdown-column">
									<h4 className="dropdown-title">Academic Pathways</h4>
									<Link to="/o-level-mastery">O-Level Mastery (WASSCE / NECO / GCE)</Link>
									<Link to="/a-level-excellence">A-Level Excellence</Link>
									<Link to="/utme-accelerator">UTME Accelerator</Link>
								</div>
								<div className="dropdown-column">
									<h4 className="dropdown-title">Tech Innovation Tracks</h4>
									<Link to="/applied-data-science">Applied Data Science</Link>
									<Link to="/data-analytics-insights">Data Analytics &amp; Insights</Link>
									<Link to="/cloud-infrastructure-engineering">Cloud Infrastructure &amp; Engineering</Link>
									<Link to="/cyber-defense-security">Cyber Defense &amp; Security</Link>
									<Link to="/full-stack-software-engineering">Full-Stack Software Engineering</Link>
								</div>
							</div>
						</li>
						<li className="has-dropdown">
							<span className="nav-label font-serif text-debutron-navy">Assessment &amp; Advisory</span>
							<ul className="dropdown">
								<li>
									<Link className="font-sans text-debutron-charcoal hover:text-debutron-navy" to="/pearson-vue">
										<span className="inline-flex items-center gap-2">
											Pearson VUE Testing Center
											<span className="rounded-sm bg-yellow-400 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-debutron-navy">Coming Soon</span>
										</span>
									</Link>
								</li>
								<li>
									<Link className="font-sans text-debutron-charcoal hover:text-debutron-navy" to="/educational-consulting">Educational Consulting</Link>
								</li>
								<li>
									<Link className="font-sans text-debutron-charcoal hover:text-debutron-navy" to="/exam-registration">Exam Registration (WASSCE / NECO / UTME)</Link>
								</li>
							</ul>
						</li>
						<li>
							<NavLink className="font-serif text-debutron-navy transition-colors duration-200 hover:text-debutron-navy" to="/contact">Contact</NavLink>
						</li>
					</ul>
				</nav>

				<div
					className="relative hidden items-center md:flex"
					onClick={() => desktopSearchRef.current?.focus()}
					role="search"
				>
					<FiSearch className="pointer-events-none absolute left-2 z-10 text-xl text-debutron-navy" aria-hidden="true" />
					<input
						ref={desktopSearchRef}
						type="text"
						placeholder="Search..."
						value={searchQuery}
						onChange={(event) => setSearchQuery(event.target.value)}
						className="pl-10 pr-4 py-2 rounded-full border border-transparent bg-transparent w-12 focus:w-48 sm:focus:w-64 focus:bg-gray-100 focus:border-gray-300 focus:outline-none transition-all duration-300 ease-in-out cursor-pointer focus:cursor-text font-sans text-sm"
					/>
				</div>
			</div>

			<div
				ref={mobileMenuRef}
				className={`border-t border-gray-100 bg-white px-4 py-2 md:hidden origin-top transform overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-[80vh] translate-y-0 scale-y-100 opacity-100' : 'max-h-0 -translate-y-2 scale-y-95 opacity-0 pointer-events-none'}`}
				aria-label="Mobile navigation"
				aria-hidden={!isMobileMenuOpen}
				onClickCapture={handleMobileNavClickCapture}
			>
					<Link className="block w-full py-3 border-b border-gray-100 font-serif text-debutron-navy" to="/" onClick={closeMenu}>
						Home
					</Link>

					<div>
						<button
							type="button"
							onClick={() => toggleDropdown('about')}
							className="flex justify-between items-center w-full py-3 border-b border-gray-100 font-serif text-debutron-navy"
						>
							<span>About Us</span>
							{activeDropdown === 'about' ? <FiChevronDown /> : <FiChevronRight />}
						</button>
						{activeDropdown === 'about' && (
							<div className="flex flex-col pl-6 space-y-3 py-2 bg-gray-50 font-sans text-debutron-charcoal">
								<Link to="/about" onClick={closeMenu}>
							Our Story
								</Link>
								<Link to="/who-we-are" onClick={closeMenu}>
							Vision &amp; Core Values
								</Link>
								<Link to="/leadership" onClick={closeMenu}>
							Leadership &amp; Teaching Team
								</Link>
								<Link to="/innovation-lab" onClick={closeMenu}>
							The Innovation Lab (Facilities)
								</Link>
								<Link to="/accreditations-partnerships" onClick={closeMenu}>
							Accreditations &amp; Partnerships
								</Link>
								<Link to="/careers" onClick={closeMenu}>
							Careers
								</Link>
							</div>
						)}
					</div>

					<div>
						<button
							type="button"
							onClick={() => toggleDropdown('innovations')}
							className="flex justify-between items-center w-full py-3 border-b border-gray-100 font-serif text-debutron-navy"
						>
							<span>Innovations</span>
							{activeDropdown === 'innovations' ? <FiChevronDown /> : <FiChevronRight />}
						</button>
						{activeDropdown === 'innovations' && (
							<div className="flex flex-col pl-6 space-y-3 py-2 bg-gray-50 font-sans text-debutron-charcoal">
								<Link to="/ai-data-models" onClick={closeMenu}>
							AI &amp; Data Models
								</Link>
								<Link to="/enterprise-consulting" onClick={closeMenu}>
							Enterprise Consulting
								</Link>
								<Link to="/student-showcase" onClick={closeMenu}>
							Student App Showcase
								</Link>
							</div>
						)}
					</div>

					<div>
						<button
							type="button"
							onClick={() => toggleDropdown('programs')}
							className="flex justify-between items-center w-full py-3 border-b border-gray-100 font-serif text-debutron-navy"
						>
							<span>Programs</span>
							{activeDropdown === 'programs' ? <FiChevronDown /> : <FiChevronRight />}
						</button>
						{activeDropdown === 'programs' && (
							<div className="flex flex-col pl-6 space-y-3 py-2 bg-gray-50 font-sans text-debutron-charcoal">
								<Link to="/o-level-mastery" onClick={closeMenu}>
								O-Level Mastery (WASSCE / NECO / GCE)
								</Link>
								<Link to="/a-level-excellence" onClick={closeMenu}>
								A-Level Excellence
								</Link>
								<Link to="/utme-accelerator" onClick={closeMenu}>
								UTME Accelerator
								</Link>
								<Link to="/applied-data-science" onClick={closeMenu}>
								Applied Data Science
								</Link>
								<Link to="/data-analytics-insights" onClick={closeMenu}>
								Data Analytics &amp; Insights
								</Link>
								<Link to="/full-stack-software-engineering" onClick={closeMenu}>
								Full-Stack Software Engineering
								</Link>
								<Link to="/cyber-defense-security" onClick={closeMenu}>
								Cyber Defense &amp; Security
								</Link>
								<Link to="/cloud-infrastructure-engineering" onClick={closeMenu}>
								Cloud Infrastructure &amp; Engineering
								</Link>
							</div>
						)}
					</div>

					<div>
						<button
							type="button"
							onClick={() => toggleDropdown('assessment')}
							className="flex justify-between items-center w-full py-3 border-b border-gray-100 font-serif text-debutron-navy"
						>
							<span>Assessment &amp; Advisory</span>
							{activeDropdown === 'assessment' ? <FiChevronDown /> : <FiChevronRight />}
						</button>
						{activeDropdown === 'assessment' && (
							<div className="flex flex-col pl-6 space-y-3 py-2 bg-gray-50 font-sans text-debutron-charcoal">
								<Link to="/pearson-vue" onClick={closeMenu}>
							<span className="inline-flex items-center gap-2">
								Pearson VUE Testing Center
								<span className="rounded-sm bg-yellow-400 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-debutron-navy">Coming Soon</span>
							</span>
								</Link>
								<Link to="/educational-consulting" onClick={closeMenu}>
							Educational Consulting
								</Link>
								<Link to="/exam-registration" onClick={closeMenu}>
							Exam Registration (WASSCE / NECO / UTME)
								</Link>
							</div>
						)}
					</div>

					<Link className="block w-full py-3 font-serif text-debutron-navy" to="/contact" onClick={closeMenu}>
						Contact
					</Link>
			</div>
		</header>
	)
}

export default Header
