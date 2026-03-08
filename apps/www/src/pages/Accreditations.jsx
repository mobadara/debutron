function Accreditations() {
	return (
		<section className="route-page bg-white">
			<header className="bg-gray-50 py-16 text-center">
				<div className="mx-auto max-w-5xl px-6">
					<h1 className="font-serif text-4xl font-bold text-debutron-navy">Accreditations &amp; Strategic Alliances</h1>
					<p className="mt-4 font-sans text-lg text-debutron-charcoal">
						Our legal standing, industry connections, and examination body registrations.
					</p>
				</div>
			</header>

			<section className="mx-auto max-w-4xl px-6 py-16 text-center">
				<h2 className="mb-6 font-serif text-2xl text-debutron-navy">Corporate Registration</h2>
				<div className="rounded-sm border border-gray-200 bg-white p-8 shadow-sm">
					<div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-sm border border-gray-300 bg-gray-50 font-sans text-xs font-semibold tracking-widest text-debutron-charcoal">
						CAC
					</div>
					<p className="font-sans leading-relaxed text-debutron-charcoal">
						Debutron Lab is a fully registered corporate entity with the Corporate Affairs Commission (CAC) of Nigeria, operating under strict legal and professional compliance standards.
					</p>
				</div>
			</section>

			<section className="px-6 pb-20">
				<h2 className="mb-10 text-center font-serif text-2xl text-debutron-navy">Strategic Alliances &amp; Exam Registrations</h2>
				<div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
					<article className="rounded-sm border border-gray-200 bg-gray-50 p-6 shadow-sm">
						<div className="mb-4 flex h-16 w-full items-center justify-center rounded-sm border border-gray-300 bg-white font-sans text-xs font-semibold tracking-widest text-debutron-charcoal">
							MICROSOFT / GOOGLE
						</div>
						<h3 className="mb-3 font-serif text-xl text-debutron-navy">Technology Ecosystem</h3>
						<p className="font-sans text-sm leading-relaxed text-debutron-charcoal">
							We align our curriculum with industry standards from global tech leaders, utilizing their tools and platforms for hands-on training in Cloud and Data Science.
						</p>
					</article>

					<article className="rounded-sm border border-gray-200 bg-gray-50 p-6 shadow-sm">
						<div className="mb-4 flex h-16 w-full items-center justify-center rounded-sm border border-gray-300 bg-white font-sans text-xs font-semibold tracking-widest text-debutron-charcoal">
							JAMB / WAEC
						</div>
						<h3 className="mb-3 font-serif text-xl text-debutron-navy">Examination Registration</h3>
						<p className="font-sans text-sm leading-relaxed text-debutron-charcoal">
							We serve as a trusted registration and preparatory hub for major national examinations including UTME, WASSCE, and NECO.
						</p>
					</article>

					<article className="rounded-sm border border-gray-200 bg-gray-50 p-6 shadow-sm">
						<div className="mb-4 flex h-16 w-full items-center justify-center rounded-sm border border-gray-300 bg-white font-sans text-xs font-semibold tracking-widest text-debutron-charcoal">
							PEARSON VUE
						</div>
						<h3 className="mb-3 font-serif text-xl text-debutron-navy">Future Testing Standards</h3>
						<p className="font-sans text-sm leading-relaxed text-debutron-charcoal">
							Debutron Lab is actively working towards becoming an authorized Pearson VUE testing center to bring global professional certification testing directly to our campus.
						</p>
					</article>
				</div>
			</section>
		</section>
	)
}

export default Accreditations
