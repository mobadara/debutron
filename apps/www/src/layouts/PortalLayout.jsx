import { useEffect, useRef, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { FiBell, FiLogOut, FiMenu, FiSettings, FiUser } from 'react-icons/fi'
import { TopUtilityBar } from '@debutron/ui/sec'
import GlobalSidebar from '../components/layout/GlobalSidebar'
import PortalFooter from '../components/layout/PortalFooter'
import { mockLoggedInUser, programNames } from '../data/mockUser'

function PortalLayout() {
	const loggedInUser = {
		...mockLoggedInUser,
		lastName: 'Obadara',
	}

	const [activeTrack, setActiveTrack] = useState(loggedInUser.active_track)
	const [activeProgram, setActiveProgram] = useState(loggedInUser.active_program)
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)
	const [isProfileOpen, setIsProfileOpen] = useState(false)
	const [isNotifOpen, setIsNotifOpen] = useState(false)
	const [notifications, setNotifications] = useState([
		{ id: 1, title: 'Welcome to Debutron', desc: 'Your portal account is ready.', unread: true },
		{ id: 2, title: 'Application Draft Saved', desc: 'Your tracking ID is active.', unread: true },
	])
	const unreadCount = notifications.filter((n) => n.unread).length
	const markAllAsRead = () => {
		setNotifications(notifications.map((n) => ({ ...n, unread: false })))
	}

	const profileRef = useRef(null)
	const notifRef = useRef(null)

	useEffect(() => {
		const handleOutsideClick = (event) => {
			if (profileRef.current && !profileRef.current.contains(event.target)) {
				setIsProfileOpen(false)
			}

			if (notifRef.current && !notifRef.current.contains(event.target)) {
				setIsNotifOpen(false)
			}
		}

		document.addEventListener('mousedown', handleOutsideClick)

		return () => {
			document.removeEventListener('mousedown', handleOutsideClick)
		}
	}, [])

	return (
		<div className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-900">
			<TopUtilityBar showUtilityLinks={false} />
			<div className="flex flex-1">
				<GlobalSidebar
					activeTrack={activeTrack}
					setActiveTrack={setActiveTrack}
					activeProgram={activeProgram}
					setActiveProgram={setActiveProgram}
					user={loggedInUser}
					programNames={programNames}
					isOpen={isSidebarOpen}
					setIsOpen={setIsSidebarOpen}
				/>

				<div className="flex-1 flex flex-col overflow-hidden">
					<header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between dark:bg-slate-900 dark:border-slate-700 relative z-[1100]">
						<div className="flex items-center">
							<button onClick={() => setIsSidebarOpen(true)} className="md:hidden mr-4 p-2 text-slate-600 hover:bg-slate-100 rounded-md" type="button" aria-label="Open sidebar">
								<FiMenu className="h-6 w-6" />
							</button>
							<h1 className="text-2xl font-serif font-bold text-slate-900 dark:text-slate-100">Student Portal</h1>
						</div>

						<div className="flex items-center gap-4">
							<div className="relative z-[1200]" ref={notifRef}>
								<button
									type="button"
									onClick={() => setIsNotifOpen(!isNotifOpen)}
									className="relative rounded-full bg-slate-100 p-2 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
									aria-label="Open notifications"
								>
									<FiBell className="h-5 w-5 text-slate-600 dark:text-slate-200" />
									{unreadCount > 0 && <span className="absolute top-0 right-0 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-900" />}
								</button>

								{isNotifOpen && (
									<div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 shadow-xl rounded-md z-[1200] overflow-hidden dark:bg-slate-900 dark:border-slate-700">
										<div className="flex justify-between items-center px-4 py-3 border-b border-slate-100 dark:border-slate-700">
											<span className="font-bold text-slate-900 dark:text-slate-100">Notifications</span>
											{unreadCount > 0 && (
												<button onClick={markAllAsRead} className="text-xs text-blue-600 hover:text-blue-800 font-semibold dark:text-blue-300 dark:hover:text-blue-200" type="button">
													Mark all as read
												</button>
											)}
										</div>

										<div className="max-h-64 overflow-y-auto">
											{notifications.map((n) => (
												<div key={n.id} className={`px-4 py-3 border-b border-slate-50 hover:bg-slate-50 cursor-pointer dark:border-slate-700 dark:hover:bg-slate-800 ${n.unread ? 'bg-blue-50/50 dark:bg-blue-950/30' : 'bg-white dark:bg-slate-900'}`}>
													<p className="text-sm font-bold text-slate-900 dark:text-slate-100">{n.title}</p>
													<p className="text-xs text-slate-500 mt-1 dark:text-slate-300">{n.desc}</p>
												</div>
											))}
										</div>

										<Link to="/student/settings" onClick={() => setIsNotifOpen(false)} className="block w-full text-center px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors rounded-b-md dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-slate-100">
											See all notifications
										</Link>
									</div>
								)}
							</div>

							<div className="relative z-[1200]" ref={profileRef}>
								<button
									type="button"
									onClick={() => setIsProfileOpen(!isProfileOpen)}
									className="bg-slate-100 p-2 rounded-full text-slate-600 hover:bg-slate-200"
									aria-label="Open profile menu"
								>
									<FiUser className="h-5 w-5 text-slate-600" />
								</button>

								{isProfileOpen && (
									<div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 shadow-xl rounded-md z-[1200] py-2 overflow-hidden dark:bg-slate-900 dark:border-slate-700">
										<div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700">
											<p className="text-sm font-bold text-slate-900 dark:text-slate-100">{loggedInUser.firstName} {loggedInUser.lastName}</p>
											<p className="text-xs text-slate-500 dark:text-slate-300 font-mono mt-1">ID: {loggedInUser.id}</p>
										</div>
										<Link to="/student/settings" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800">
											<FiSettings />
											Settings
										</Link>
										<Link to="/login/student" className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 font-bold border-t border-slate-100 dark:border-slate-700 mt-1">
											<FiLogOut />
											Sign Out
										</Link>
									</div>
								)}
							</div>
						</div>
					</header>

					<main id="main-content" className="flex-1 overflow-y-auto p-6">
						<Outlet context={{ activeTrack, setActiveTrack, activeProgram, setActiveProgram, user: loggedInUser, programNames }} />
					</main>
				</div>
			</div>

			<PortalFooter />
		</div>
	)
}

export default PortalLayout
