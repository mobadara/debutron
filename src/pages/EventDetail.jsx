import { FiCalendar, FiClock, FiMapPin } from 'react-icons/fi'
import { Link, useParams } from 'react-router-dom'
import { eventsData } from '../data/siteContent'

function EventDetail() {
	const { id } = useParams()
	const parsedId = Number.parseInt(id, 10)
	const event = eventsData.find((item) => item.id === parsedId || item.id === id)

	const handleAddToCalendar = () => {
		alert('Calendar integration coming soon!')
	}

	if (!event) {
		return (
			<section className="bg-gray-50 min-h-screen px-6 py-16">
				<div className="mx-auto max-w-4xl rounded-sm border border-gray-200 bg-white p-10 shadow-sm">
					<h1 className="font-serif text-3xl font-bold text-debutron-navy">Event Not Found</h1>
					<p className="mt-4 font-sans text-gray-700">
						The event you are looking for is unavailable or may have been moved.
					</p>
					<Link to="/events" className="mt-6 inline-block font-sans text-sm text-debutron-navy hover:underline">
						&larr; Back to All Events
					</Link>
				</div>
			</section>
		)
	}

	return (
		<section className="bg-gray-50 min-h-screen py-16 px-6">
			<div className="max-w-4xl mx-auto bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
				<header className="bg-debutron-navy text-white p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
					<div>
						<Link to="/events" className="text-gray-300 font-sans text-sm hover:text-white mb-4 inline-block">
							&larr; Back to All Events
						</Link>
						<h1 className="font-serif text-3xl md:text-4xl font-bold">{event.title}</h1>
					</div>

					<div className="bg-white text-center p-4 min-w-[100px] rounded-sm shadow-md">
						<p className="text-sm uppercase text-gray-500 font-bold">{event.month}</p>
						<p className="text-4xl font-serif text-debutron-navy">{event.date}</p>
					</div>
				</header>

				<div className="p-10">
					<div className="grid gap-6 md:grid-cols-2">
						<div className="flex items-start gap-3">
							<FiClock className="text-debutron-navy mt-1" />
							<p className="font-sans text-lg text-gray-700">{event.time}</p>
						</div>
						<div className="flex items-start gap-3">
							<FiMapPin className="text-debutron-navy mt-1" />
							<p className="font-sans text-lg text-gray-700">{event.location}</p>
						</div>
					</div>

					<p className="font-sans text-gray-800 leading-relaxed mt-8 border-t border-gray-100 pt-8 whitespace-pre-line">
						{event.description}
					</p>
				</div>

				<footer className="bg-gray-50 p-8 flex justify-end items-center border-t border-gray-200">
					<button
						onClick={handleAddToCalendar}
						className="bg-debutron-navy text-white px-8 py-3 rounded-sm font-sans font-bold flex items-center gap-2 hover:bg-debutron-charcoal transition-colors"
					>
						<FiCalendar />
						Add to Calendar
					</button>
				</footer>
			</div>
		</section>
	)
}

export default EventDetail
