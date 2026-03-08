function ALevelExcellence() {
	const overviewCards = [
		{
			title: 'Advanced Curriculum',
			description:
				'Deep, topic-by-topic rigorous onsite teaching designed to build strong conceptual mastery across Cambridge A-Level and JUPEB pathways.',
		},
		{
			title: 'Empathetic Mentorship',
			description:
				'Holistic student profiling and supportive staff guidance to align academic strategy with each learner\'s strengths, pace, and goals.',
		},
		{
			title: 'Digital Portal Integration',
			description:
				'AI-tracked past question simulations through our portal to monitor performance trends and sharpen exam readiness over time.',
		},
	]

	return (
		<div className="bg-white text-debutron-charcoal">
			<section className="relative overflow-hidden bg-debutron-navy px-6 py-24 text-center text-white">
				<div className="mx-auto max-w-5xl">
					<span className="mb-6 inline-block rounded-sm bg-yellow-500 px-3 py-1 font-sans text-xs font-bold uppercase tracking-widest text-debutron-navy">
						Coming Soon
					</span>
					<h1 className="mb-4 font-serif text-4xl font-bold md:text-5xl">A-Level Excellence</h1>
					<p className="mx-auto max-w-2xl font-sans text-lg text-gray-200">
						Direct-entry university preparation through Cambridge A-Levels and JUPEB, powered by our signature AI-monitored, two-phase methodology.
					</p>
				</div>
			</section>

			<section className="mx-auto grid max-w-6xl gap-8 px-6 py-16 md:grid-cols-3">
				{overviewCards.map((card) => (
					<article key={card.title} className="border border-gray-200 bg-white p-6 text-center shadow-sm">
						<h2 className="font-serif text-xl font-bold text-debutron-navy">{card.title}</h2>
						<p className="mt-3 font-sans leading-relaxed text-gray-700">{card.description}</p>
					</article>
				))}
			</section>

			<section className="border-t border-gray-200 bg-gray-50 px-6 py-16 text-center">
				<div className="mx-auto max-w-3xl">
					<p className="mb-6 font-serif text-2xl text-debutron-navy">
						Join the waitlist to be notified when enrollment opens for the A-Level track.
					</p>
					<form
						className="mx-auto flex max-w-xl flex-col items-center justify-center gap-3 sm:flex-row"
						onSubmit={(event) => event.preventDefault()}
					>
						<input
							type="email"
							placeholder="Enter your email"
							className="w-full rounded-sm border border-gray-300 bg-white px-4 py-3 font-sans text-debutron-charcoal outline-none transition-colors focus:border-debutron-navy sm:w-72"
						/>
						<button
							type="submit"
							className="rounded-sm bg-debutron-navy px-6 py-3 font-sans font-bold text-white transition-colors hover:bg-debutron-charcoal"
						>
							Notify Me
						</button>
					</form>
				</div>
			</section>
		</div>
	)
}

export default ALevelExcellence
