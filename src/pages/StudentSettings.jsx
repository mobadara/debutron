import React, { useEffect, useState } from 'react'
import { FiShield, FiBell, FiSettings, FiCheckCircle } from 'react-icons/fi'
import { defaultNotificationPreferences, settingsNotificationHistory } from '../data/portal/notificationsData'

const FieldLabel = ({ text }) => (
  <label className="block text-sm font-semibold text-gray-700 mb-2">{text}</label>
)

export default function StudentSettings() {
  const preferenceStorageKey = 'debutron-notification-preferences'
  const [activeTab, setActiveTab] = useState('security')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [notificationPreferences, setNotificationPreferences] = useState(() => {
    const defaultPreferences = defaultNotificationPreferences

    const storedPreferences = window.localStorage.getItem(preferenceStorageKey)
    if (!storedPreferences) return defaultPreferences

    try {
      const parsedPreferences = JSON.parse(storedPreferences)
      return { ...defaultPreferences, ...parsedPreferences }
    } catch {
      window.localStorage.removeItem(preferenceStorageKey)
      return defaultPreferences
    }
  })

  function handleSubmit(event) {
    event.preventDefault()
    setSuccessMessage('Password updated securely.')

    setTimeout(() => {
      setSuccessMessage('')
    }, 2500)
  }

  function handlePreferenceChange(key) {
    setNotificationPreferences((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  useEffect(() => {
    window.localStorage.setItem(preferenceStorageKey, JSON.stringify(notificationPreferences))
  }, [notificationPreferences, preferenceStorageKey])

  return (
    <section className="max-w-6xl mx-auto p-8">
      <header>
        <h1 className="font-serif text-3xl text-debutron-navy mb-6">Account Settings</h1>
      </header>

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 flex flex-col gap-2">
          <nav className="space-y-2" aria-label="Settings sections">
            <button
              type="button"
              onClick={() => setActiveTab('security')}
              className={`w-full text-left flex items-center gap-2 px-4 py-3 rounded-sm font-semibold text-sm border ${activeTab === 'security' ? 'bg-debutron-navy text-white border-debutron-navy' : 'bg-white text-slate-600 border-gray-200 hover:bg-slate-50'}`}
            >
              <FiShield className="h-4 w-4" />
              Security &amp; Password
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('notifications')}
              className={`w-full text-left flex items-center gap-2 px-4 py-3 rounded-sm font-semibold text-sm border ${activeTab === 'notifications' ? 'bg-debutron-navy text-white border-debutron-navy' : 'bg-white text-slate-600 border-gray-200 hover:bg-slate-50'}`}
            >
              <FiBell className="h-4 w-4" />
              Notifications &amp; Alerts
            </button>
          </nav>
        </aside>

        <div className="flex-1 bg-white p-8 border border-gray-200 shadow-sm rounded-sm">
          {activeTab === 'security' && (
            <>
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
            </>
          )}

          {activeTab === 'notifications' && (
            <>
              <h2 className="font-serif text-2xl text-slate-900 border-b border-gray-100 pb-4 mb-6">
                <FiSettings className="inline mr-2" />
                Notification History &amp; Preferences
              </h2>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => handlePreferenceChange('gradesEmail')}
                  className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-sm hover:bg-gray-50"
                >
                  <span className="text-sm font-medium text-slate-700">Email Alerts for Grades</span>
                  <span className={`h-6 w-11 rounded-full p-0.5 transition-colors ${notificationPreferences.gradesEmail ? 'bg-debutron-navy' : 'bg-gray-300'}`}>
                    <span className={`block h-5 w-5 rounded-full bg-white transition-transform ${notificationPreferences.gradesEmail ? 'translate-x-5' : 'translate-x-0'}`} />
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handlePreferenceChange('tuitionEmail')}
                  className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-sm hover:bg-gray-50"
                >
                  <span className="text-sm font-medium text-slate-700">Email Alerts for Tuition Receipts</span>
                  <span className={`h-6 w-11 rounded-full p-0.5 transition-colors ${notificationPreferences.tuitionEmail ? 'bg-debutron-navy' : 'bg-gray-300'}`}>
                    <span className={`block h-5 w-5 rounded-full bg-white transition-transform ${notificationPreferences.tuitionEmail ? 'translate-x-5' : 'translate-x-0'}`} />
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handlePreferenceChange('urgentSms')}
                  className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-sm hover:bg-gray-50"
                >
                  <span className="text-sm font-medium text-slate-700">SMS Alerts for Urgent Schedule Changes</span>
                  <span className={`h-6 w-11 rounded-full p-0.5 transition-colors ${notificationPreferences.urgentSms ? 'bg-debutron-navy' : 'bg-gray-300'}`}>
                    <span className={`block h-5 w-5 rounded-full bg-white transition-transform ${notificationPreferences.urgentSms ? 'translate-x-5' : 'translate-x-0'}`} />
                  </span>
                </button>
              </div>

              <h3 className="text-lg font-bold text-slate-800 mt-10 mb-4">Recent Activity</h3>
              <div className="border border-gray-200 rounded-sm overflow-hidden">
                {settingsNotificationHistory.map((item) => (
                  <div key={item.id} className="p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50">
                    <div className="flex items-start gap-3">
                      <FiCheckCircle className="h-5 w-5 text-debutron-navy mt-0.5" />
                      <div>
                        <p className="text-sm text-slate-700">
                          <span className="font-semibold">{item.source}</span> - {item.message}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">{item.timestamp}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
