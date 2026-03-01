import { Link } from 'react-router-dom'
import { newsData } from '../../data/siteContent'

function LatestNews() {
	const latestNews = newsData.slice(0, 3)

	return (
		<section>
			<h2 className="mb-8 text-center font-serif text-3xl text-debutron-navy">Latest News &amp; Updates</h2>
			<div className="grid gap-8 md:grid-cols-3">
				{latestNews.map((item) => (
					<article key={item.id} className="overflow-hidden rounded-sm border border-gray-100 bg-white shadow-sm">
						<img className="h-48 w-full object-cover" src={item.image} alt={item.title} />
						<div className="p-5">
							<h3 className="font-serif text-xl text-debutron-navy">{item.title}</h3>
							<p className="mt-2 font-sans text-sm text-gray-500">{item.date}</p>
							<p className="mt-3 font-sans text-sm text-gray-700">{item.excerpt}</p>
							<Link className="mt-4 inline-block font-sans text-sm font-semibold text-debutron-navy hover:underline" to={`/news/${item.id}`}>
								Read More
							</Link>
						</div>
					</article>
				))}
			</div>
			<div className="mt-8 text-center">
				<Link className="inline-block rounded-sm border border-debutron-navy px-5 py-2 font-sans text-sm font-semibold text-debutron-navy hover:bg-debutron-navy/10" to="/news">
					View All News
				</Link>
			</div>
		</section>
	)
}

export default LatestNews