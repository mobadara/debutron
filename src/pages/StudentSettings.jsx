import React, { useState } from 'react'
import { FiLock, FiShield } from 'react-icons/fi'

const FieldLabel = ({ text }) => (
  <label className="block text-sm font-semibold text-gray-700 mb-2">{text}</label>
)

export default function StudentSettings() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    setSuccessMessage('Password updated securely.')

    setTimeout(() => {
      setSuccessMessage('')
    }, 2500)
  }

  return (
    <section className="max-w-6xl mx-auto p-8">
      <header>
        <h1 className="font-serif text-3xl text-debutron-navy mb-6">Account Settings</h1>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px,1fr]">
        <aside className="bg-white border border-gray-200 shadow-sm rounded-sm p-4 h-fit">
          <nav className="space-y-2" aria-label="Settings sections">
            <button
              type="button"
              className="w-full text-left flex items-center gap-2 bg-blue-50 text-debutron-navy border border-blue-200 px-3 py-2 rounded-sm font-semibold text-sm"
            >
              <FiLock className="h-4 w-4" />
              Security &amp; Password
            </button>
            <button
              type="button"
              className="w-full text-left px-3 py-2 rounded-sm text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              Notifications
            </button>
            <button
              type="button"
              className="w-full text-left px-3 py-2 rounded-sm text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              Billing
            </button>
          </nav>
        </aside>

        <div className="bg-white max-w-2xl p-8 border border-gray-200 shadow-sm rounded-sm">
          <h2 className="font-serif text-xl mb-6 border-b border-gray-100 pb-4">
            <FiShield className="inline text-debutron-navy mr-2" />
            Password &amp; Security
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-5">
              <div>
                <FieldLabel text="Current Password" />
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(event) => setCurrentPassword(event.target.value)}
                  className="w-full rounded-sm border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-debutron-navy"
                />
              </div>

              <div>
                <FieldLabel text="New Password" />
                <input
                  type="password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  className="w-full rounded-sm border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-debutron-navy"
                />
                <p className="mt-2 text-xs text-gray-500">
                  Must be at least 8 characters long and contain a number and a special character.
                </p>
              </div>

              <div>
                <FieldLabel text="Confirm New Password" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  className="w-full rounded-sm border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-debutron-navy"
                />
              </div>
            </div>

            {successMessage && <p className="mt-4 text-sm font-semibold text-green-600">{successMessage}</p>}

            <button
              type="submit"
              className="bg-debutron-navy text-white px-8 py-3 mt-6"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
