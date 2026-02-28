import { aboutPageData } from '../data/public/aboutData'

function AboutPage() {
	return (
		<main className="bg-debutron-gray px-6 py-14 md:px-12">
			<div className="mx-auto max-w-7xl space-y-14">
				<section className="grid items-stretch gap-8 rounded border border-slate-200 bg-debutron-white p-6 md:grid-cols-2 md:p-10">
					<div className="overflow-hidden rounded">
						<img
							src={aboutPageData.story.image}
							alt={aboutPageData.story.imageAlt}
							className="h-full w-full object-cover"
						/>
					</div>
					<div>
						<h1 className="font-serif text-4xl text-debutron-navy">{aboutPageData.story.title}</h1>
						<p className="mt-5 font-sans text-base leading-relaxed text-debutron-charcoal">
							{aboutPageData.story.body}
						</p>
					</div>
				</section>

				<section>
					<h2 className="font-serif text-3xl text-debutron-navy">{aboutPageData.visionMission.title}</h2>
					<div className="mt-6 grid gap-6 md:grid-cols-2">
						{aboutPageData.visionMission.items.map((item) => (
							<article key={item.title} className="rounded border border-slate-200 bg-debutron-white p-7 shadow-md transition hover:shadow-lg">
								<h3 className="font-serif text-2xl text-debutron-navy">{item.title}</h3>
								<p className="mt-4 font-sans text-base leading-relaxed text-debutron-charcoal">{item.body}</p>
							</article>
						))}
					</div>
				</section>

				<section>
					<h2 className="font-serif text-3xl text-debutron-navy">{aboutPageData.coreValues.title}</h2>
					<div className="mt-6 grid gap-6 md:grid-cols-2">
						{aboutPageData.coreValues.items.map((item) => (
							<article key={item.title} className="rounded border border-slate-200 bg-debutron-white p-7">
								<h3 className="font-serif text-2xl text-debutron-navy">{item.title}</h3>
								<p className="mt-3 font-sans text-base leading-relaxed text-debutron-charcoal">{item.body}</p>
							</article>
						))}
					</div>
				</section>
			</div>
		</main>
	)
}

export default AboutPage
