import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiBell, FiUser, FiMenu, FiSettings, FiLogOut, FiChevronDown } from 'react-icons/fi'
import DebutronLogo from '../DebutronLogo'

function PortalHeader({ onToggleSidebar }) {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)

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
				<button
					type="button"
					aria-label="View notifications"
					className="relative text-gray-700 transition-colors hover:text-debutron-navy"
				>
					<FiBell className="h-5 w-5" />
					<span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500" />
				</button>

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
							<span className="font-sans text-sm font-bold text-gray-700">Muyiwa</span>
							<span className="font-mono text-xs text-gray-500">000001</span>
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
