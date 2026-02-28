import React, { useState } from 'react'
import { FiEdit2, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi'

const ReadOnlyField = ({ label, value }) => (
  <div>
    <label className="block text-sm font-sans text-gray-500 mb-1">{label}</label>
    <div className="bg-gray-50 text-gray-600 rounded-sm p-3 text-sm cursor-not-allowed">{value}</div>
  </div>
)

const EditableField = ({ label, placeholder, icon }) => {
  const [value, setValue] = useState('')
  return (
    <div>
      <label className="block text-sm font-sans text-gray-700 mb-1 flex items-center gap-2">
        <span className="flex items-center gap-2">
          {icon}
          <span>{label}</span>
        </span>
        <FiEdit2 className="text-gray-400 ml-2 inline" />
      </label>

      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white rounded-sm border border-gray-200 p-3 text-sm outline-none focus:border-debutron-navy focus:ring-1 focus:ring-debutron-navy"
      />
    </div>
  )
}

const EditableTextarea = ({ label, placeholder }) => {
  const [value, setValue] = useState('')
  return (
    <div>
      <label className="block text-sm font-sans text-gray-700 mb-1 flex items-center gap-2">
        <span>{label}</span>
        <FiEdit2 className="text-gray-400 ml-2 inline" />
      </label>

      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        rows={5}
        className="w-full bg-white rounded-sm border border-gray-200 p-3 text-sm outline-none focus:border-debutron-navy focus:ring-1 focus:ring-debutron-navy"
      />
    </div>
  )
}

export default function StudentProfile() {
  const [saving, setSaving] = useState(false)

  function handleSave() {
    setSaving(true)
    // placeholder for save logic
    setTimeout(() => setSaving(false), 800)
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-sm">
      <header className="mb-6">
        <h1 className="font-serif text-3xl text-debutron-navy mb-2">My Digital Identity</h1>
        <p className="text-sm text-gray-600">Manage your public profile and networking links.</p>
      </header>

      <section className="grid grid-cols-1 gap-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ReadOnlyField label="First Name" value="Muyiwa" />
          <ReadOnlyField label="Last Name" value="Obadara" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ReadOnlyField label="Student ID" value="000001" />
          <ReadOnlyField label="Enrolled Track" value="Tech Innovation Track" />
        </div>
      </section>

      <section className="mb-6">
        <h2 className="font-serif text-xl text-debutron-navy mb-4">Personal Details</h2>

        <div className="grid grid-cols-1 gap-4">
          <EditableField label="Middle Name" placeholder="Enter middle name" />
          <EditableTextarea label="Professional Bio" placeholder="Short bio for public profile" />
        </div>
      </section>

      <section className="mb-6">
        <h2 className="font-serif text-xl text-debutron-navy mb-4">Networking Links</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <EditableField label="GitHub" placeholder="github.com/username" icon={<FiGithub className="text-gray-600" />} />
          <EditableField label="LinkedIn" placeholder="linkedin.com/in/username" icon={<FiLinkedin className="text-gray-600" />} />
          <EditableField label="X / Twitter" placeholder="twitter.com/username" icon={<FiTwitter className="text-gray-600" />} />
        </div>
      </section>

      <div className="mt-6 text-right">
        <button
          onClick={handleSave}
          className="bg-debutron-navy text-white px-8 py-3 rounded-sm"
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save Profile Changes'}
        </button>
      </div>
    </div>
  )
}
