import React from 'react'

const events = [
  { id: 1, date: 5, title: 'Statistical Methods Quiz', time: '10:00 AM', type: 'Assessment', desc: 'Covers regression and hypothesis testing.' },
  { id: 2, date: 12, title: 'Guest Lecture: Cloud Security', time: '2:00 PM', type: 'Lecture', desc: 'Industry talk on cloud security best practices.' },
  { id: 3, date: 20, title: 'Project Submission Deadline', time: '11:59 PM', type: 'Deadline', desc: 'Final project submission for cohort.' },
]

function handleExportICS(ev) {
  alert('Downloading .ics file...')
}

export default function StudentCalendar() {
  const days = Array.from({ length: 30 }, (_, i) => i + 1)

  return (
    <div className="max-w-6xl mx-auto p-8">
      <header>
        <h1 className="font-serif text-3xl mb-6">Academic Calendar</h1>
      </header>

      <div className="grid grid-cols-7 gap-2">
        {days.map((d) => {
          const dayEvents = events.filter((e) => e.date === d)
          return (
            <div key={d} className="h-32 p-2 relative bg-white border border-gray-200 hover:bg-gray-50 group">
              <div className="text-xs text-gray-500">{d}</div>

              {dayEvents.length > 0 && (
                <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-0.5 rounded">{dayEvents.length}</span>
              )}

              {/* Tooltip on hover */}
              {dayEvents.map((ev) => (
                <div key={ev.id} className="opacity-0 group-hover:opacity-100 absolute z-50 bg-slate-900 text-white p-4 rounded-sm shadow-xl w-64 left-0 top-8">
                  <div className="font-semibold">{ev.title}</div>
                  <div className="text-sm text-gray-200">{ev.time} • {ev.type}</div>
                  <div className="mt-2 text-sm text-gray-200">{ev.desc}</div>
                  <div className="mt-3">
                    <button onClick={() => handleExportICS(ev)} className="text-blue-300 text-sm">Add to Calendar</button>
                  </div>
                </div>
              ))}
            </div>
          )
        })}
      </div>

      <section className="mt-8">
        <h2 className="font-serif text-xl mb-4">Upcoming Events</h2>
        <ul className="space-y-3">
          {events.map((ev) => (
            <li key={ev.id} className="bg-white p-4 border border-gray-200 rounded-sm flex items-start justify-between">
              <div>
                <div className="font-semibold">{ev.title}</div>
                <div className="text-sm text-gray-600">{ev.date} • {ev.time} — {ev.desc}</div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <button onClick={() => handleExportICS(ev)} className="px-3 py-2 bg-debutron-navy text-white rounded-sm">Add to Calendar</button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
