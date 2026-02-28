import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  FiGrid,
  FiBookOpen,
  FiFileText,
  FiCalendar,
  FiBriefcase,
  FiCreditCard,
  FiUser,
  FiX,
} from 'react-icons/fi'

const links = [
  { to: '/student/dashboard', label: 'Dashboard', icon: FiGrid },
  { to: '/student/courses', label: 'Course Schedule', icon: FiBookOpen },
  { to: '/student/transcript', label: 'Transcripts & Scores', icon: FiFileText },
  { to: '/student/calendar', label: 'Academic Calendar', icon: FiCalendar },
  { to: '/student/graduation', label: 'Graduation & Careers', icon: FiBriefcase },
  { to: '/student/tuition', label: 'Tuition & Finance', icon: FiCreditCard },
  { to: '/student/profile', label: 'My Profile', icon: FiUser },
]

export default function PortalSidebar({ open = false, onClose = () => {} }) {
  const studentTrack = 'Tech Innovation Track' // Swap to 'Academic Track' to test

  const base =
    'flex items-center gap-3 px-4 py-3 rounded-sm font-sans text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-colors'
  const active = 'bg-white/10 text-white border-l-4 border-blue-400'

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="w-64 bg-debutron-navy text-white min-h-screen flex flex-col hidden md:flex">
        <nav className="flex-1 px-4 py-8 space-y-2" aria-label="Portal navigation">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className={({ isActive }) => `${base} ${isActive ? active : ''}`}>
              <Icon className="h-4 w-4" aria-hidden="true" />
              <span>
                {to === '/student/calendar'
                  ? studentTrack === 'Academic Track'
                    ? 'Academic Calendar'
                    : 'Calendar'
                  : to === '/student/transcript'
                    ? studentTrack === 'Academic Track'
                      ? 'Academic Transcript'
                      : 'Transcripts & Scores'
                    : label}
              </span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Mobile sidebar overlay */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-debutron-navy text-white flex flex-col md:hidden transform transition-transform ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="px-4 py-4">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close sidebar"
              className="rounded-md p-2 text-gray-200 hover:bg-white/10"
            >
              <FiX className="h-5 w-5" />
            </button>
          </div>

          <nav className="mt-2 space-y-2" aria-label="Portal mobile navigation">
            {links.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={onClose}
                className={({ isActive }) => `${base} ${isActive ? active : ''}`}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span>
                  {to === '/student/calendar'
                    ? studentTrack === 'Academic Track'
                      ? 'Academic Calendar'
                      : 'Calendar'
                    : to === '/student/transcript'
                      ? studentTrack === 'Academic Track'
                        ? 'Academic Transcript'
                        : 'Transcripts & Scores'
                      : label}
                </span>
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>

      {/* Backdrop for mobile when open */}
      {open && <div className="fixed inset-0 z-40 bg-black/40 md:hidden" onClick={onClose} />}
    </>
  )
}
