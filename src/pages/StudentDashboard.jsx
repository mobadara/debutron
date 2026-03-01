import React from 'react'

function StudentDashboard() {
  const studentTrack = 'Tech Innovation Track'
  const studyMode = 'Onsite (Ibadan Hub)' // Swap to "Online Remote" to test

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="max-w-7xl mx-auto p-8">
        <header>
          <h1 className="font-serif text-4xl font-bold text-debutron-navy">Welcome back, Muyiwa.</h1>

          <div className="mt-3 mb-8">
            <span className="bg-debutron-navy text-white px-4 py-1.5 rounded-sm font-mono text-sm tracking-widest font-bold shadow-sm">ID: 000001</span>

            <div className="flex flex-wrap items-center gap-3 mt-2 text-gray-600 font-sans">
              <span>Tech Innovation Track - Applied Data Science | Cohort Alpha</span>
              {studentTrack === 'Tech Innovation Track' && (
                <span className="flex items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-sm text-xs font-bold tracking-wide">
                  <span className={`w-2 h-2 rounded-full ${studyMode.includes('Online') ? 'bg-green-500' : 'bg-blue-600'}`}></span>
                  {studyMode}
                </span>
              )}
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 gap-6 mb-10 md:grid-cols-3">
          <article className="border-t-4 border-blue-500 bg-white p-6 shadow-sm">
            <h3 className="mb-4 font-serif text-xl font-semibold text-debutron-navy">
              {studentTrack === 'Academic Track' ? 'Academic Progress' : 'Overall Progress'}
            </h3>
            <p className="mb-2 text-sm text-gray-600">Module Completion</p>
            <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-blue-500"
                style={{ width: '68%' }}
                role="progressbar"
                aria-valuenow={68}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Module completion"
              />
            </div>
            <p className="mt-2 text-sm font-medium text-gray-700">68% complete</p>
          </article>

          <article className="border-t-4 border-purple-500 bg-white p-6 shadow-sm">
            <h3 className="mb-4 font-serif text-xl font-semibold text-debutron-navy">AI Learning Profile</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>Primary Style: Visual-Spatial</li>
              <li>Pacing: Accelerated</li>
              <li>Zodiac Synergy: High Focus</li>
            </ul>
          </article>

          <article className="border-t-4 border-amber-500 bg-white p-6 shadow-sm">
            <h3 className="mb-4 font-serif text-xl font-semibold text-debutron-navy">Next Assessment</h3>
            <p className="text-sm text-gray-700">Statistical Methods Quiz</p>
            <p className="mt-2 text-sm font-medium text-amber-700">Happening in 3 days</p>
          </article>
        </section>

        {studentTrack === 'Tech Innovation Track' && (
          <section>
            <h2 className="font-serif text-2xl text-debutron-navy mb-4 mt-8">Partner Learning Platforms</h2>

            <div className="grid md:grid-cols-3 gap-6">
              <article className="bg-white p-6 border border-gray-200 border-l-4 border-green-500 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                <div className="text-gray-800 font-bold">DataCamp Portal</div>
                <a href="https://www.datacamp.com" target="_blank" rel="noopener noreferrer" className="text-debutron-navy font-medium">Launch -&gt;</a>
              </article>

              <article className="bg-white p-6 border border-gray-200 border-l-4 border-red-700 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                <div className="text-gray-800 font-bold">Harvard CS50 Workspace</div>
                <a href="https://cs50.harvard.edu" target="_blank" rel="noopener noreferrer" className="text-debutron-navy font-medium">Launch -&gt;</a>
              </article>

              <article className="bg-white p-6 border border-gray-200 border-l-4 border-blue-800 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                <div className="text-gray-800 font-bold">WQU Applied Math</div>
                <a href="https://wqu.edu" target="_blank" rel="noopener noreferrer" className="text-debutron-navy font-medium">Launch -&gt;</a>
              </article>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default StudentDashboard
