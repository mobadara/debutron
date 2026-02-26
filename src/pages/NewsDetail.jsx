import { Link, useParams } from 'react-router-dom'
import { newsData } from '../data/siteContent'

function NewsDetail() {
	const { id } = useParams()
	const parsedId = Number.parseInt(id, 10)
	const article = newsData.find((item) => item.id === id || item.id === parsedId)

	if (!article) {
		return (
			<section className="bg-debutron-gray px-6 py-20 text-debutron-charcoal">
				<div className="mx-auto max-w-4xl rounded-sm border border-gray-200 bg-white p-8 shadow-sm">
					<h1 className="font-serif text-3xl text-debutron-navy">Article Not Found</h1>
					<p className="mt-3 font-sans text-base text-gray-700">
						The article you requested could not be found.
					</p>
					<Link to="/news" className="mt-6 inline-block font-sans text-sm font-semibold text-debutron-navy hover:underline">
						Return to all news
					</Link>
				</div>
			</section>
		)
	}

	return (
		<div className="bg-debutron-gray text-debutron-charcoal">
			<img
				src={article.image}
				alt={article.title}
				className="h-64 w-full object-cover shadow-sm md:h-96"
			/>

			<section className="mx-auto max-w-4xl px-6 py-12">
				<Link
					to="/news"
					className="mb-8 inline-block font-sans text-sm text-debutron-navy hover:underline"
				>
					&larr; Back to News
				</Link>

				<h1 className="mb-4 font-serif text-4xl font-bold leading-tight text-debutron-navy md:text-5xl">
					{article.title}
				</h1>

				<span className="mb-8 block border-b border-gray-200 pb-6 font-sans text-sm uppercase tracking-widest text-gray-500">
					{article.date} • By Debutron Lab Communications
				</span>

				<p className="whitespace-pre-line font-sans text-lg leading-relaxed text-gray-800">
					{article.content || article.excerpt}
				</p>
			</section>
		</div>
	)
}

export default NewsDetail
