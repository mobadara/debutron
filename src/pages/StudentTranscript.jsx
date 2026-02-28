import React from 'react'

const modules = [
  {
    code: 'DSC-101',
    name: 'Mathematical Foundations of Data Science',
    score: 92,
    grade: 'A',
  },
  {
    code: 'SWE-102',
    name: 'Python Programming & Logic',
    score: 85,
    grade: 'B+',
  },
  {
    code: 'CLD-101',
    name: 'Cloud Computing Essentials',
    score: 89,
    grade: 'A-',
  },
]

function getGradeClass(grade) {
  if (!grade) return 'text-gray-700'
  if (grade.startsWith('A')) return 'text-green-600 font-bold'
  if (grade.startsWith('B')) return 'text-blue-600 font-bold'
  return 'text-gray-700 font-semibold'
}

export default function StudentTranscript() {
  const studentTrack = 'Tech Innovation Track'

  const average = modules.reduce((s, m) => s + (Number(m.score) || 0), 0) / modules.length
  const avgFormatted = `${average.toFixed(1)}%`

  return (
    <div className="max-w-6xl mx-auto p-8">
      <header>
        <h2 className="font-serif text-3xl text-debutron-navy mb-6">
          {studentTrack === 'Academic Track' ? 'Academic Transcript & Scores' : 'Official Transcript & Scores'}
        </h2>

          <div className="bg-debutron-navy text-white p-6 rounded-sm flex justify-between items-center mb-8 shadow-md">
          <div>
            <div className="text-sm font-sans">Overall Average Score</div>
            <div className="mt-1 text-sm text-white/90">Summary of performance</div>
          </div>

            <div className="flex items-center gap-4 flex-col md:flex-row">
              <div className="text-right">
                <div className="font-mono text-4xl font-bold text-blue-300">{avgFormatted}</div>
                <div className="mt-2">
                  <span className="bg-blue-500/30 text-blue-100 text-xs px-2 py-1 rounded">Excellent Standing</span>
                </div>
              </div>
            </div>
        </div>
      </header>

      <section>
        <h3 className="font-serif text-xl mb-4">
          {studentTrack === 'Academic Track' ? 'Subject Breakdown' : 'Module Breakdown'}
        </h3>

        <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="bg-gray-50 text-gray-500 font-sans text-xs uppercase tracking-wider text-left p-4 border-b border-gray-200">Course Code</th>
                <th className="bg-gray-50 text-gray-500 font-sans text-xs uppercase tracking-wider text-left p-4 border-b border-gray-200">Module Name</th>
                <th className="bg-gray-50 text-gray-500 font-sans text-xs uppercase tracking-wider text-left p-4 border-b border-gray-200">Score (%)</th>
                <th className="bg-gray-50 text-gray-500 font-sans text-xs uppercase tracking-wider text-left p-4 border-b border-gray-200">Grade</th>
              </tr>
            </thead>

            <tbody>
              {modules.map((m) => (
                <tr key={m.code} className="odd:bg-white even:bg-gray-50">
                  <td className="p-4 text-sm text-gray-700 border-b border-gray-100">{m.code}</td>
                  <td className="p-4 text-sm text-gray-700 border-b border-gray-100">{m.name}</td>
                  <td className="p-4 text-sm text-gray-700 border-b border-gray-100">{m.score}%</td>
                  <td className={`p-4 text-sm border-b border-gray-100 ${getGradeClass(m.grade)}`}>{m.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
