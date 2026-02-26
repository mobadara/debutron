import { useEffect, useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import TopUtilityBar from './TopUtilityBar'

function MainLayout() {
	const [isCookieAccepted, setIsCookieAccepted] = useState(false)
	const [isRouteLoading, setIsRouteLoading] = useState(false)
	const location = useLocation()
	const loadingTimeoutRef = useRef(null)

	const handleShellClickCapture = (event) => {
		const linkElement = event.target.closest('a')
		if (!linkElement) {
			return
		}

		const href = linkElement.getAttribute('href')
		if (!href || href.startsWith('#')) {
			return
		}

		if (linkElement.target === '_blank' || linkElement.hasAttribute('download')) {
			return
		}

		if (href.startsWith('mailto:') || href.startsWith('tel:')) {
			return
		}

		const destination = new URL(linkElement.href, window.location.origin)
		if (destination.origin !== window.location.origin) {
			return
		}

		const currentRoute = `${location.pathname}${location.search}${location.hash}`
		const targetRoute = `${destination.pathname}${destination.search}${destination.hash}`
		if (targetRoute === currentRoute) {
			return
		}

		setIsRouteLoading(true)
	}

	useEffect(() => {
		if (!isRouteLoading) {
			return
		}

		if (loadingTimeoutRef.current) {
			window.clearTimeout(loadingTimeoutRef.current)
		}

		loadingTimeoutRef.current = window.setTimeout(() => {
			setIsRouteLoading(false)
		}, 320)

		return () => {
			if (loadingTimeoutRef.current) {
				window.clearTimeout(loadingTimeoutRef.current)
			}
		}
	}, [location.pathname, location.search, location.hash, isRouteLoading])

	useEffect(() => {
		return () => {
			if (loadingTimeoutRef.current) {
				window.clearTimeout(loadingTimeoutRef.current)
			}
		}
	}, [])

	return (
		<div className="site-shell" id="top" onClickCapture={handleShellClickCapture}>
			{isRouteLoading && (
				<div className="route-loading-indicator" aria-hidden="true">
					<span />
				</div>
			)}
			<TopUtilityBar />
			<Header />
			<main>
				<Outlet />
			</main>
			<Footer />
			{!isCookieAccepted && (
				<div className="fixed bottom-0 left-0 z-50 flex w-full flex-col items-center justify-between gap-3 bg-debutron-charcoal p-4 text-sm text-white shadow-lg md:flex-row">
					<p className="font-sans">
						We use cookies to enhance your experience, analyze site traffic, and serve tailored educational content. By continuing to visit this site, you agree to our use of cookies.
					</p>
					<button
						type="button"
						onClick={() => setIsCookieAccepted(true)}
						className="border border-white bg-debutron-navy px-4 py-2 transition-colors hover:bg-white hover:text-debutron-navy"
					>
						Accept
					</button>
				</div>
			)}
		</div>
	)
}

export default MainLayout
