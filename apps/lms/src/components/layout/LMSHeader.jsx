import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FiBell, FiChevronDown, FiLogOut } from 'react-icons/fi'

// Simple responsive logo component
const DebutronLogoMini = ({ className = 'w-8 h-8' }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M10 20C10 14.4772 14.4772 10 20 10H80C85.5228 10 90 14.4772 90 20V60C90 76.5685 76.5685 90 60 90H40C23.4315 90 10 76.5685 10 60V20Z"
      fill="none"
    />
    <path
      d="M30 30V70H50C61.0457 70 70 61.0457 70 50C70 38.9543 61.0457 30 50 30H30Z"
      stroke="currentColor"
      strokeWidth="12"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="65" cy="35" r="8" fill="#3b82f6" />
    <path d="M45 55L65 35" stroke="#3b82f6" strokeWidth="6" strokeLinecap="round" />
  </svg>
)

const mockUser = {
  name: 'Muyiwa',
  headshot: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Muyiwa',
}

export default function LMSHeader() {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [notificationOpen, setNotificationOpen] = useState(false)
  const notificationRef = useRef(null)
  const profileRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()

  const navLinks = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'My Courses', path: '/courses' },
    { label: 'eLibrary', path: import.meta.env.VITE_LIBRARY_URL || '#' },
    { label: 'Global Forums', path: '/forums/global' },
  ]

  const isActive = (path) => location.pathname === path

  const handleNavClick = (path) => {
    if (path.startsWith('http://') || path.startsWith('https://')) {
      window.open(path, '_blank')
    } else {
      navigate(path)
    }
  }

  const handleLogout = () => {
    // Placeholder for logout logic
    navigate('/')
  }

  useEffect(() => {
    if (!dropdownOpen && !notificationOpen) {
      return
    }

    const handlePointerDown = (event) => {
      const clickedInsideNotification = notificationRef.current?.contains(event.target)
      const clickedInsideProfile = profileRef.current?.contains(event.target)

      if (!clickedInsideNotification && !clickedInsideProfile) {
        setDropdownOpen(false)
        setNotificationOpen(false)
      }
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setDropdownOpen(false)
        setNotificationOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [dropdownOpen, notificationOpen])

  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
      <div className="flex h-16 items-center justify-between px-6 lg:px-10 max-w-[1600px] mx-auto">
        {/* Left Side: Logo & Nav */}
        <div className="flex items-center gap-10">
          {/* Logo */}
          <DebutronLogoMini className="w-8 h-8 text-slate-900 dark:text-white" />

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.label}
                type="button"
                onClick={() => handleNavClick(link.path)}
                className={`text-sm font-medium transition-colors whitespace-nowrap ${
                  isActive(link.path)
                    ? 'text-blue-600 dark:text-blue-400 font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
                aria-current={isActive(link.path) ? 'page' : undefined}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Right Side: Notifications & User Menu */}
        <div className="flex items-center gap-4">
          {/* Notification Bell */}
          <div ref={notificationRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setNotificationOpen((previous) => !previous)
                setDropdownOpen(false)
              }}
              className="relative p-2 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
              aria-label="Notifications"
              aria-expanded={notificationOpen}
            >
              <FiBell size={20} />
              {/* Notification Badge */}
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {/* Notification Dropdown */}
            {notificationOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg py-2 z-50">
                <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-700">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Notifications
                  </h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  <button type="button" className="w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <p className="text-xs font-medium text-slate-900 dark:text-white">
                      Assignment Due Soon
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                      Data Science Project due in 2 days
                    </p>
                  </button>
                  <button type="button" className="w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-t border-slate-200 dark:border-slate-700">
                    <p className="text-xs font-medium text-slate-900 dark:text-white">
                      Grade Posted
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                      Your midterm exam has been graded
                    </p>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Dropdown */}
          <div ref={profileRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setDropdownOpen((previous) => !previous)
                setNotificationOpen(false)
              }}
              className="flex items-center gap-2 px-2 py-1 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
              aria-label={`User menu for ${mockUser.name}`}
              aria-expanded={dropdownOpen}
              aria-haspopup="menu"
            >
              <img
                src={mockUser.headshot}
                alt={mockUser.name}
                className="w-8 h-8 rounded-full border border-slate-300 dark:border-slate-600"
              />
              <span className="hidden sm:inline text-sm font-medium">{mockUser.name}</span>
              <FiChevronDown
                size={16}
                className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Profile Dropdown Menu */}
            {dropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg py-2 z-50"
                role="menu"
              >
                <button
                  type="button"
                  onClick={() => navigate('/profile')}
                  className="w-full text-left px-4 py-2 text-sm text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  role="menuitem"
                >
                  My Profile
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/settings')}
                  className="w-full text-left px-4 py-2 text-sm text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  role="menuitem"
                >
                  Settings
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/help')}
                  className="w-full text-left px-4 py-2 text-sm text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-t border-slate-200 dark:border-slate-700"
                  role="menuitem"
                >
                  Help Center
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 transition-colors flex items-center gap-2 mt-2 border-t border-slate-200 dark:border-slate-700"
                  role="menuitem"
                >
                  <FiLogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Logout Button (Mobile Visible) */}
          <button
            type="button"
            onClick={handleLogout}
            className="md:hidden text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium focus:outline-none focus:ring-2 focus:ring-red-500 rounded px-2 py-1 transition-colors"
            aria-label="Logout"
          >
            <FiLogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  )
}
