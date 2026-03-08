import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { FiArrowLeft, FiDownload, FiMessageSquare, FiFileText, FiUser } from 'react-icons/fi'
import { getCourseById } from '../data/portal/coursesData'

export default function CourseDetail() {
  const { id } = useParams()

  const course = getCourseById(id) || getCourseById('DSC-101')

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10">
      <Link to="/student/courses" className="text-blue-700 font-bold hover:underline mb-6 inline-flex items-center gap-2">
        <FiArrowLeft /> Back to Course Schedule
      </Link>

      <section className="bg-white border-2 border-slate-900 p-8 shadow-[4px_4px_0px_#0f172a] mb-10">
        <h1 className="font-serif text-4xl text-slate-900 font-extrabold mb-4 leading-tight">
          {course.id}: {course.title}
        </h1>

        <div className="text-lg text-slate-800 font-medium mb-2 flex items-center gap-3">
          <FiUser className="h-5 w-5" />
          <span>Instructor: {course.instructor}</span>
        </div>
        <div className="text-lg text-slate-800 font-medium mb-2 flex items-center gap-3">
          <FiUser className="h-5 w-5" />
          <span>Course Rep: {course.rep}</span>
        </div>
        <div className="text-lg text-slate-800 font-medium mb-2 flex items-center gap-3">
          <FiFileText className="h-5 w-5" />
          <span>Schedule: {course.schedule}</span>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <article className="bg-blue-50 border-2 border-blue-900 p-6">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Course Syllabus &amp; Assessment Guide</h2>
          <button type="button" className="bg-blue-900 text-white px-6 py-4 text-lg font-bold flex items-center gap-3 w-full md:w-auto">
            <FiDownload className="h-5 w-5" />
            View / Download Syllabus
          </button>
        </article>

        <article className="bg-green-50 border-2 border-green-900 p-6">
          <h2 className="text-2xl font-bold text-green-900 mb-4">Lecture Notes &amp; Datasets</h2>
          <button type="button" className="bg-green-900 text-white px-6 py-4 text-lg font-bold flex items-center gap-3 w-full md:w-auto">
            <FiFileText className="h-5 w-5" />
            Access Course Drive
          </button>
        </article>

        <article className="bg-slate-50 border-2 border-slate-900 p-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Direct Messaging</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <button type="button" className="border-2 border-slate-900 text-slate-900 bg-white hover:bg-slate-900 hover:text-white px-6 py-4 text-lg font-bold transition-colors flex items-center justify-center gap-3">
              <FiMessageSquare className="h-5 w-5" />
              Message Instructor
            </button>
            <button type="button" className="border-2 border-slate-900 text-slate-900 bg-white hover:bg-slate-900 hover:text-white px-6 py-4 text-lg font-bold transition-colors flex items-center justify-center gap-3">
              <FiMessageSquare className="h-5 w-5" />
              Message Course Rep
            </button>
          </div>
        </article>
      </section>
    </div>
  )
}
