import { Link } from 'react-router-dom'
import { eventItems, eventsPageData } from '../data/public/eventsData'

function EventsPage() {
	return (
		<div className="bg-debutron-gray text-debutron-charcoal">
			<section className="border-b border-gray-200 bg-gray-100 px-6 py-16 text-center">
				<h1 className="font-serif text-4xl font-bold text-debutron-navy">{eventsPageData.title}</h1>
			</section>

			<section className="mx-auto max-w-4xl px-6 pt-8">
				<div className="flex flex-col gap-3 sm:flex-row">
					<input
						type="text"
						placeholder={eventsPageData.searchPlaceholder}
						className="w-full rounded-sm border border-gray-300 bg-white px-4 py-2 font-sans text-sm text-debutron-charcoal outline-none"
					/>
					<select className="w-full rounded-sm border border-gray-300 bg-white px-4 py-2 font-sans text-sm text-debutron-charcoal outline-none sm:max-w-[220px]">
						{eventsPageData.categories.map((category) => (
							<option key={category}>{category}</option>
						))}
					</select>
				</div>
			</section>

			<section className="mx-auto flex max-w-4xl flex-col space-y-6 px-6 py-12">
				{eventItems.map((event) => (
					<article key={event.id} className="flex flex-col items-start gap-6 border border-gray-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center">
						<div className="min-w-[90px] border border-gray-200 bg-gray-50 p-3 text-center">
							<p className="font-sans text-xs uppercase text-gray-500">{event.month}</p>
							<p className="font-serif text-3xl text-debutron-navy">{event.date}</p>
						</div>

						<div className="w-full">
							<h2 className="font-serif text-xl text-debutron-navy">{event.title}</h2>
							<div className="mt-1 flex flex-wrap gap-4 font-sans text-xs text-gray-500">
								<span>{event.time}</span>
								<span>{event.location}</span>
							</div>
							<p className="mt-3 font-sans text-sm text-gray-700">{event.description}</p>
							<Link
								to={`/events/${event.id}`}
								className="mt-4 inline-block rounded-sm bg-debutron-navy px-4 py-2 font-sans text-xs text-white"
							>
								View Details
							</Link>
						</div>
					</article>
				))}
			</section>
		</div>
	)
}

export default EventsPage
