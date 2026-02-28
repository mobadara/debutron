import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiBell, FiUser, FiMenu, FiSettings, FiLogOut, FiChevronDown, FiCheck } from 'react-icons/fi'
import DebutronLogo from '../DebutronLogo'
import { portalNotifications, portalStudentIdentity } from '../../data/portal/notificationsData'

function PortalHeader({ onToggleSidebar }) {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	const [isNotifOpen, setIsNotifOpen] = useState(false)
	const [notifications, setNotifications] = useState(portalNotifications)

	const unreadCount = notifications.filter((n) => !n.read).length

	function handleMarkAllRead() {
		setNotifications((prev) => prev.map((item) => ({ ...item, read: true })))
	}

	function handleMarkOneRead(id) {
		setNotifications((prev) => prev.map((item) => (item.id === id ? { ...item, read: true } : item)))
	}

	return (
		<header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
			<div className="flex items-center">
				{/* Mobile menu toggle */}
				<button
					type="button"
					aria-label="Open sidebar"
					onClick={onToggleSidebar}
					className="mr-3 inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 md:hidden"
				>
					<FiMenu className="h-5 w-5" />
				</button>

				<DebutronLogo className="h-8 w-8" />
				<div className="mx-4 h-6 w-px bg-gray-300" />
				<p className="font-serif text-lg font-bold text-debutron-navy">Student Portal</p>
			</div>

			<div className="flex items-center gap-6 relative">
				<div>
					<button
						type="button"
						aria-label="View notifications"
						aria-expanded={isNotifOpen}
						onClick={() => setIsNotifOpen((s) => !s)}
						className="relative text-gray-700 transition-colors hover:text-debutron-navy"
					>
						<FiBell className="h-5 w-5" />
						{unreadCount > 0 && <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500" />}
					</button>

					{isNotifOpen && (
						<div className="absolute top-16 right-20 w-80 bg-white border border-gray-200 shadow-xl rounded-sm z-50 overflow-hidden">
							<div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
								<p className="font-bold text-slate-800">Notifications</p>
								<button onClick={handleMarkAllRead} className="text-xs text-blue-600 hover:underline">Mark all as read</button>
							</div>

							<div>
								{notifications.length === 0 ? (
									<p className="p-4 text-sm text-slate-500">No new notifications.</p>
								) : (
									notifications.map((notification) => (
										<div
											key={notification.id}
											onClick={() => handleMarkOneRead(notification.id)}
											className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer flex gap-3 ${!notification.read ? 'bg-blue-50/30' : ''}`}
										>
											<div className="pt-0.5 text-blue-700">
												<FiCheck className="h-4 w-4" />
											</div>
											<div>
												<p className="text-sm text-slate-700">{notification.text}</p>
												<p className="text-xs text-slate-400 mt-1">{notification.time}</p>
											</div>
										</div>
									))
								)}
							</div>

							<Link to="/student/settings" className="block text-center p-3 text-sm text-blue-700 font-bold hover:bg-gray-50">
								View all in Settings
							</Link>
						</div>
					)}
				</div>

				<div className="relative">
					<button
						type="button"
						onClick={() => setIsDropdownOpen((s) => !s)}
						className="flex items-center gap-3"
						aria-expanded={isDropdownOpen}
					>
						<div className="rounded-full bg-gray-100 p-2 text-gray-600">
							<FiUser className="h-4 w-4" aria-hidden="true" />
						</div>

						<div className="flex flex-col items-end">
							<span className="font-sans text-sm font-bold text-gray-700">{portalStudentIdentity.name}</span>
							<span className="font-mono text-xs text-gray-500">{portalStudentIdentity.id}</span>
						</div>

						<FiChevronDown className="h-4 w-4 text-gray-500" />
					</button>

					{isDropdownOpen && (
						<div className="absolute top-16 right-6 w-48 bg-white border border-gray-200 shadow-lg rounded-sm py-2 z-50">
							<Link to="/student/settings" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
								<FiSettings /> Settings
							</Link>

							<Link to="/student/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
								<FiUser /> My Profile
							</Link>

							<hr className="my-1 border-gray-200" />

							<button className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left">
								<FiLogOut /> Secure Logout
							</button>
						</div>
					)}
				</div>
			</div>
		</header>
	)
}

export default PortalHeader
