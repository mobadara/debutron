import { Link } from 'react-router-dom'
import { eventsData } from '../../data/siteContent'

function UpcomingEvents() {
	const latestEvents = eventsData.slice(0, 4)

	return (
		<section>
			<h3 className="mb-6 font-serif text-3xl text-debutron-navy">Academic Calendar &amp; Events</h3>
			<div className="flex flex-col space-y-4">
				{latestEvents.map((event) => (
					<article key={event.id} className="flex gap-4 border-l-4 border-debutron-navy bg-gray-50 p-4 transition-all hover:bg-white hover:shadow-md">
						<div className="min-w-[80px] border border-gray-200 bg-white p-3 text-center">
							<p className="font-sans text-xs uppercase text-gray-500">{event.month}</p>
							<p className="font-serif text-2xl text-debutron-navy">{event.date}</p>
						</div>
						<div>
							<h4 className="font-serif text-lg text-debutron-navy">{event.title}</h4>
							<div className="mt-1 flex flex-wrap gap-4 font-sans text-xs text-gray-500">
								<span>{event.time}</span>
								<span>{event.location}</span>
							</div>
							<Link className="mt-3 inline-block font-sans text-sm font-semibold text-debutron-navy hover:underline" to={`/events/${event.id}`}>
								View Details
							</Link>
						</div>
					</article>
				))}
			</div>
			<div className="mt-6">
				<Link className="inline-block rounded-sm border border-debutron-navy px-5 py-2 font-sans text-sm font-semibold text-debutron-navy hover:bg-debutron-navy/10" to="/events">
					View Full Calendar
				</Link>
			</div>
		</section>
	)
}

export default UpcomingEvents