import { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { studentCalendarEvents, studentTrack } from '../data/portal/calendarData'

export default function StudentCalendar() {
  const [date, setDate] = useState(new Date())

  const selectedDateEvents = studentCalendarEvents.filter((event) => event.date.toDateString() === date.toDateString())

  return (
    <div className="max-w-6xl mx-auto p-8">
      <header>
        <h1 className="font-serif text-3xl text-slate-900 mb-6">
          {studentTrack === 'Academic Track' ? 'Academic Calendar' : 'Campus Calendar'}
        </h1>
      </header>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-2/3 bg-white p-6 border border-slate-200 shadow-sm overflow-x-auto">
          <Calendar
            onChange={setDate}
            value={date}
            className="w-full border-none font-sans"
            tileContent={({ date: tileDate, view }) =>
              view === 'month' && studentCalendarEvents.some((event) => event.date.toDateString() === tileDate.toDateString()) ? (
                <div className="w-2 h-2 bg-blue-600 rounded-full mx-auto mt-1"></div>
              ) : null
            }
          />
        </div>

        <aside className="w-full md:w-1/3 bg-slate-50 p-6 border border-slate-200 shadow-sm max-h-[34rem] overflow-y-auto">
          <h2 className="font-bold text-lg text-slate-800 mb-4">Selected Date: {date.toDateString()}</h2>

          {selectedDateEvents.length > 0 ? (
            <ul className="space-y-3">
              {selectedDateEvents.map((event) => (
                <li key={event.id} className="bg-white border border-slate-200 p-4 rounded-sm">
                  <p className="font-semibold text-slate-800">{event.title}</p>
                  <p className="text-sm text-slate-600 mt-1">Time: {event.time}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-600">No scheduled events for this day.</p>
          )}
        </aside>
      </div>
    </div>
  )
}
