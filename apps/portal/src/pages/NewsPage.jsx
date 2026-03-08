import { Link } from 'react-router-dom'
import { newsItems, newsPageData } from '../data/public/newsData'

function NewsPage() {
	return (
		<div className="bg-debutron-gray text-debutron-charcoal dark:bg-slate-900">
			<section className="bg-debutron-navy px-6 py-16 text-center text-white">
				<h1 className="font-serif text-4xl font-bold">{newsPageData.title}</h1>
			</section>

			<section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-2 lg:grid-cols-3">
				{newsItems.map((item) => (
					<article key={item.id} className="overflow-hidden rounded-sm border border-gray-100 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
						<img className="h-48 w-full object-cover" src={item.image} alt={item.title} />
						<div className="p-5">
							<h2 className="font-serif text-xl text-debutron-navy dark:text-slate-200">{item.title}</h2>
							<p className="mt-2 font-sans text-sm text-gray-500 dark:text-slate-300">{item.date}</p>
							<p className="mt-3 font-sans text-sm text-gray-700 dark:text-slate-200">{item.excerpt}</p>
							<Link className="mt-4 inline-block font-sans text-sm font-semibold text-debutron-navy hover:underline dark:text-slate-200" to={`/news/${item.id}`}>
								Read More
							</Link>
						</div>
					</article>
				))}
			</section>
		</div>
	)
}

export default NewsPage
