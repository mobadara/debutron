import React from 'react'
import { FiPrinter } from 'react-icons/fi'
import { portalStudentIdentity } from '../data/portal/notificationsData'
import { tuitionStudentTrack } from '../data/portal/tuitionData'

const techTrackData = [
  {
    id: 'DSC-101',
    title: 'Mathematical Foundations',
    score: '92%',
    grade: 'A',
  },
]

const academicTrackData = [
  {
    id: 'MATH-01',
    title: 'Mathematics - Trigonometry Test I',
    score: '88%',
    grade: 'A',
  },
  {
    id: 'PHY-02',
    title: 'Physics - Equilibrium of Forces Test II',
    score: '75%',
    grade: 'B',
  },
]

function getGradeClass(grade) {
  if (!grade) return 'text-gray-700'
  if (grade.startsWith('A')) return 'text-green-600 font-bold'
  if (grade.startsWith('B')) return 'text-blue-600 font-bold'
  return 'text-gray-700 font-semibold'
}

export default function StudentTranscript() {
  const studentTrack = tuitionStudentTrack
  const studentData = portalStudentIdentity
  const isAcademicTrack = studentTrack.toLowerCase().includes('academic')
  const activeData = isAcademicTrack ? academicTrackData : techTrackData

  const average =
    activeData.reduce((sum, item) => sum + (Number.parseFloat(item.score) || 0), 0) /
    activeData.length
  const avgFormatted = `${average.toFixed(1)}%`

  return (
    <div className="max-w-6xl mx-auto p-8">
      <header>
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-serif text-3xl text-debutron-navy">Academic Progress Record</h2>
          <button
            onClick={() => window.print()}
            className="print:hidden bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2 text-sm font-bold flex items-center gap-2 shadow-sm"
          >
            <FiPrinter />
            Print Official Record
          </button>
        </div>

        <div className="mb-6 rounded-sm border border-slate-200 bg-white p-4">
          <div className="grid grid-cols-1 gap-3 text-sm text-slate-700 md:grid-cols-3">
            <p>
              <span className="font-bold text-slate-900">Student Name:</span> {studentData.name}
            </p>
            <p>
              <span className="font-bold text-slate-900">Student ID:</span> {studentData.id}
            </p>
            <p>
              <span className="font-bold text-slate-900">Track:</span> {studentTrack}
            </p>
          </div>
        </div>

        <div className="bg-debutron-navy text-white p-6 rounded-sm flex justify-between items-center mb-8 shadow-md">
          <div>
            <div className="text-sm font-sans">Overall Average Score</div>
            <div className="mt-1 text-sm text-white/90">Summary of performance</div>
          </div>

          <div className="flex items-center gap-4 flex-col md:flex-row">
            <div className="text-right">
              <div className="font-mono text-4xl font-bold text-blue-300">{avgFormatted}</div>
              <div className="mt-2">
                <span className="bg-blue-500/30 text-blue-100 text-xs px-2 py-1 rounded">
                  Excellent Standing
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section>
        <h3 className="font-serif text-xl mb-4">
          {isAcademicTrack ? 'Subject Breakdown' : 'Module Breakdown'}
        </h3>

        <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="bg-gray-50 text-gray-500 font-sans text-xs uppercase tracking-wider text-left p-4 border-b border-gray-200">Course Code</th>
                <th className="bg-gray-50 text-gray-500 font-sans text-xs uppercase tracking-wider text-left p-4 border-b border-gray-200">
                  {isAcademicTrack ? 'Assessment Title' : 'Module Name'}
                </th>
                <th className="bg-gray-50 text-gray-500 font-sans text-xs uppercase tracking-wider text-left p-4 border-b border-gray-200">Score (%)</th>
                <th className="bg-gray-50 text-gray-500 font-sans text-xs uppercase tracking-wider text-left p-4 border-b border-gray-200">Grade</th>
              </tr>
            </thead>

            <tbody>
              {activeData.map((item) => (
                <tr key={item.id} className="odd:bg-white even:bg-gray-50">
                  <td className="p-4 text-sm text-gray-700 border-b border-gray-100">{item.id}</td>
                  <td className="p-4 text-sm text-gray-700 border-b border-gray-100">{item.title}</td>
                  <td className="p-4 text-sm text-gray-700 border-b border-gray-100">{item.score}</td>
                  <td className={`p-4 text-sm border-b border-gray-100 ${getGradeClass(item.grade)}`}>
                    {item.grade}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
