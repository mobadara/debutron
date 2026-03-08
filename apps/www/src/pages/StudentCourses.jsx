import { Link, useOutletContext } from 'react-router-dom'

export default function StudentCourses() {
  const { activeTrack = 'A' } = useOutletContext() || {}

  const academicCourses = [
    { id: 'MATH-01', title: 'Advanced Mathematics', type: 'Course', instructor: 'Mr. Muyiwa' },
  ]

  const techModules = [
    { id: 'DSC-101', title: 'Python for Data Science', type: 'Module', instructor: 'Debutron AI' },
  ]

  const displayData = activeTrack === 'A' ? academicCourses : techModules

  return (
    <div className="max-w-6xl mx-auto p-8">
      <header className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-slate-900 mb-2">
          {activeTrack === 'A' ? 'Academic Course Schedule' : 'Tech Module Curriculum'}
        </h1>
        <p className="text-slate-600">
          View your upcoming {activeTrack === 'A' ? 'courses and classes.' : 'modules and labs.'}
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayData.map((item) => (
          <article key={item.id} className="bg-white p-6 border border-gray-200 shadow-sm border-t-4 border-debutron-navy">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-sm text-gray-500">{item.id}</span>
              <span className="bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded-sm font-semibold">{item.type}</span>
            </div>

            <h2 className="font-serif text-xl font-bold text-slate-900 mb-2">{item.title}</h2>
            <p className="text-sm text-slate-600 mb-5">Instructor: {item.instructor}</p>

            <Link
              to={`/student/courses/${item.id}`}
              className="block w-full text-center bg-slate-900 text-white py-3 px-4 font-bold text-sm md:text-base hover:bg-blue-700 transition-colors rounded-sm"
            >
              Go to {activeTrack === 'A' ? 'Course Space' : 'Module Space'}
            </Link>
          </article>
        ))}
      </section>
    </div>
  )
}
