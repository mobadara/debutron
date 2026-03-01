import { Link } from 'react-router-dom'
import HeroCarousel from '../components/home/HeroCarousel'
import LatestNews from '../components/home/LatestNews'
import UpcomingEvents from '../components/home/UpcomingEvents'
import { homeCohortBanner, homeShowcaseBlock, homeVisionMissionBlock } from '../data/public/homeData'

function HomePage() {
	return (
		<div className="home-page bg-debutron-gray">
			<HeroCarousel />

			<section className="bg-debutron-navy px-6 py-5 text-debutron-white md:px-12">
				<div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 md:flex-row md:items-center">
					<div>
						<p className="font-serif text-xl">{homeCohortBanner.title}</p>
						<p className="mt-1 font-sans text-sm text-white/85">
							{homeCohortBanner.subtitle}
						</p>
					</div>
					<Link
						to={homeCohortBanner.ctaLink}
						className="rounded border border-debutron-white bg-debutron-white px-6 py-3 font-sans text-sm font-semibold text-debutron-navy transition hover:bg-transparent hover:text-debutron-white"
					>
						{homeCohortBanner.ctaLabel}
					</Link>
				</div>
			</section>

			<div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-[2fr_1fr] md:px-12">
				<LatestNews />
				<aside>
					<UpcomingEvents />
				</aside>
			</div>

			<section className="bg-white px-6 py-16 md:px-12">
				<div className="mx-auto max-w-7xl rounded border border-slate-200 bg-debutron-white p-8 md:p-12">
					<p className="font-sans text-xs uppercase tracking-[0.18em] text-debutron-charcoal/70">{homeVisionMissionBlock.eyebrow}</p>
					<h2 className="mt-2 font-serif text-3xl text-debutron-navy md:text-4xl">{homeVisionMissionBlock.title}</h2>
					<p className="mt-4 max-w-4xl font-sans text-base leading-relaxed text-debutron-charcoal">
						{homeVisionMissionBlock.body}
					</p>

					<div className="mt-8 grid gap-6 md:grid-cols-3">
						{homeVisionMissionBlock.cards.map((card) => (
							<article key={card.title} className="rounded border border-slate-100 bg-slate-50 p-6">
								<h3 className="font-serif text-2xl text-debutron-navy">{card.title}</h3>
								{card.body ? (
									<p className="mt-3 font-sans text-sm leading-relaxed text-debutron-charcoal">{card.body}</p>
								) : (
									<ul className="mt-3 space-y-2 font-sans text-sm text-debutron-charcoal">
										{card.values?.map((value) => (
											<li key={value.label}><span className="font-semibold text-debutron-navy">{value.label}:</span> {value.body}</li>
										))}
									</ul>
								)}
							</article>
						))}
					</div>
				</div>
			</section>

			<section className="bg-gray-50 px-6 py-14 md:px-12">
				<div className="mx-auto max-w-7xl">
					<article className="rounded border border-slate-200 bg-debutron-white p-8 shadow-sm md:p-10">
						<p className="font-sans text-xs uppercase tracking-[0.18em] text-debutron-charcoal/70">{homeShowcaseBlock.eyebrow}</p>
						<h2 className="mt-2 font-serif text-3xl text-debutron-navy md:text-4xl">{homeShowcaseBlock.title}</h2>
						<p className="mt-4 max-w-3xl font-sans text-base leading-relaxed text-debutron-charcoal">
							{homeShowcaseBlock.body}
						</p>
						<Link
							to={homeShowcaseBlock.ctaLink}
							className="mt-6 inline-block rounded border border-debutron-navy bg-debutron-navy px-6 py-3 font-sans text-sm font-semibold text-white transition hover:bg-transparent hover:text-debutron-navy"
						>
							{homeShowcaseBlock.ctaLabel}
						</Link>
					</article>
				</div>
			</section>
		</div>
	)
}

export default HomePage
