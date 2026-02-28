const mockEvents = [
	{
		id: 1,
		date: 15,
		title: 'Python OOP Masterclass',
		time: '10:00 AM',
		type: 'Lecture',
		desc: 'Deep dive into classes and inheritance.',
	},
	{
		id: 2,
		date: 22,
		title: 'Tuition Deadline',
		time: '11:59 PM',
		type: 'Finance',
		desc: 'Final day for Q1 installment.',
	},
]

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function StudentCalendar() {
	const handleExportICS = (event) => {
		void event
		alert('Downloading .ics file for your calendar app...')
	}

	return (
		<section className="bg-gray-50 p-6 font-sans md:p-8">
			<div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
				<h2 className="font-serif text-3xl text-debutron-navy mb-6 md:mb-0">Academic Calendar</h2>
				<button
					type="button"
					className="rounded-sm bg-debutron-navy px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
				>
					Sync All to Google Calendar
				</button>
			</div>

			<div className="mb-2 grid grid-cols-7 gap-2 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
				{weekdays.map((day) => (
					<div key={day} className="py-1">
						{day}
					</div>
				))}
			</div>

			<div className="grid grid-cols-7 gap-2">
				{Array.from({ length: 30 }).map((_, index) => {
					const day = index + 1
					const event = mockEvents.find((calendarEvent) => calendarEvent.date === day)

					return (
						<div
							key={day}
							className="group relative h-32 border border-gray-200 bg-white p-2 transition-colors hover:bg-gray-50"
						>
							<p className="text-sm font-semibold text-gray-700">{day}</p>

							{event && (
								<>
									<span className="mt-2 inline-block rounded bg-blue-100 px-2 py-1 text-xs text-blue-800">
										{event.type}
									</span>

									<div className="pointer-events-none absolute z-10 ml-10 -mt-2 w-64 rounded bg-slate-900 p-4 text-white opacity-0 shadow-xl transition-opacity group-hover:opacity-100">
										<p className="font-serif text-base font-semibold">{event.title}</p>
										<p className="mt-1 text-sm text-slate-200">{event.time}</p>
										<p className="mt-2 text-sm text-slate-100">{event.desc}</p>
									</div>
								</>
							)}
						</div>
					)
				})}
			</div>

			<div className="mt-8 rounded-sm border border-gray-200 bg-white p-6">
				<h3 className="mb-4 font-serif text-2xl font-semibold text-debutron-navy">Upcoming Events</h3>
				<ul className="space-y-4">
					{mockEvents.map((event) => (
						<li key={event.id} className="flex flex-col gap-3 border-b border-gray-100 pb-4 last:border-b-0 last:pb-0 md:flex-row md:items-center md:justify-between">
							<div>
								<p className="font-semibold text-gray-900">{event.title}</p>
								<p className="text-sm text-gray-600">
									Day {event.date} • {event.time} • {event.type}
								</p>
								<p className="mt-1 text-sm text-gray-600">{event.desc}</p>
							</div>
							<button
								type="button"
								onClick={() => handleExportICS(event)}
								className="self-start rounded-sm border border-debutron-navy px-3 py-2 text-sm font-semibold text-debutron-navy transition-colors hover:bg-debutron-navy hover:text-white"
							>
								Add to Calendar
							</button>
						</li>
					))}
				</ul>
			</div>
		</section>
	)
}

export default StudentCalendar
