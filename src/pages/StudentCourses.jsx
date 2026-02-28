import React from 'react'
import { FiInfo, FiClock, FiUser, FiMapPin } from 'react-icons/fi'

const courses = [
  {
    code: 'DSC-101',
    title: 'Python for Data Science',
    schedule: 'Tuesdays & Thursdays, 10:00 AM',
    instructor: 'Dr. Adeyemi',
    location: 'Lab 2 (Onsite)',
    status: 'Active',
  },
  {
    code: 'DSP-210',
    title: 'Data Processing & Pipelines',
    schedule: 'Mondays & Wednesdays, 2:00 PM',
    instructor: 'Dr. Okonkwo',
    location: 'Lab 1 (Onsite)',
    status: 'Active',
  },
  {
    code: 'MLA-330',
    title: 'Applied Machine Learning',
    schedule: 'Fridays, 9:00 AM',
    instructor: 'Prof. Ibe',
    location: 'Hybrid - Room 5',
    status: 'Active',
  },
]

export default function StudentCourses() {
  return (
    <div className="max-w-6xl mx-auto p-8">
      <header className="mb-6">
        <h1 className="font-serif text-3xl text-debutron-navy mb-2">My Registered Courses</h1>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8 flex items-start gap-3">
          <FiInfo className="h-5 w-5 text-blue-500 mt-0.5" />
          <p className="text-sm text-gray-700">Your course schedule is strictly managed by Debutron Administration based on your admitted track. Contact the academic advisor for any discrepancies.</p>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((c) => (
          <article key={c.code} className="bg-white p-6 border border-gray-200 shadow-sm border-t-4 border-debutron-navy">
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm text-gray-500">{c.code}</span>
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">{c.status}</span>
            </div>

            <h2 className="font-serif text-xl font-bold mt-2 mb-4">{c.title}</h2>

            <div className="flex flex-col gap-3 text-sm text-gray-700">
              <div className="flex items-center gap-2"><FiClock className="h-4 w-4 text-gray-500" /><span>{c.schedule}</span></div>
              <div className="flex items-center gap-2"><FiUser className="h-4 w-4 text-gray-500" /><span>Instructor: {c.instructor}</span></div>
              <div className="flex items-center gap-2"><FiMapPin className="h-4 w-4 text-gray-500" /><span>{c.location}</span></div>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}
