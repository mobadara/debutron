import React from 'react'
import { Link } from 'react-router-dom'
import { FiInfo, FiClock, FiUser, FiMapPin } from 'react-icons/fi'
import { studentCourses } from '../data/portal/coursesData'

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
        {studentCourses.map((c) => (
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

            <hr className="border-t border-slate-200 my-4" />
            <Link
              to={`/student/courses/${c.id}`}
              className="block w-full text-center bg-slate-900 text-white py-3 px-4 font-bold text-sm md:text-base hover:bg-blue-700 transition-colors rounded-sm"
            >
              Access Course Space →
            </Link>
          </article>
        ))}
      </section>
    </div>
  )
}
