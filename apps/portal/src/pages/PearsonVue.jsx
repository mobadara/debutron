function PearsonVue() {
	const certifications = [
		'Microsoft & Azure Certifications',
		'AWS Cloud Practitioner & Architect',
		'Cisco (CCNA, CCNP)',
		'CompTIA (A+, Security+)',
		'Palo Alto Networks',
		'Academic Admissions (Select Exams)',
	]

	return (
		<div className="bg-white text-debutron-charcoal">
			<section className="relative overflow-hidden bg-debutron-navy px-6 py-20 text-center text-white">
				<div className="mx-auto max-w-5xl">
					<span className="mb-6 inline-block rounded-sm bg-yellow-500 px-3 py-1 font-sans text-xs font-bold uppercase tracking-widest text-debutron-navy">
						Coming Soon
					</span>
					<h1 className="mb-4 font-serif text-4xl font-bold md:text-5xl">
						Pearson VUE Testing Facility
					</h1>
					<p className="mx-auto max-w-2xl font-sans text-lg text-gray-200">
						We are currently building a secure, world-class testing environment in Ibadan for your global IT, academic, and professional certifications.
					</p>
				</div>
			</section>

			<section className="mx-auto max-w-6xl px-6 py-16">
				<div className="grid items-center gap-10 md:grid-cols-2">
					<div>
						<h2 className="mb-4 font-serif text-3xl text-debutron-navy">Uncompromising Security &amp; Comfort</h2>
						<p className="font-sans leading-relaxed text-gray-700">
							Our upcoming testing center is being designed to meet rigorous global Pearson VUE standards. We are preparing a distraction-free, climate-controlled, and ergonomically designed environment so you can focus entirely on achieving your best score.
						</p>
					</div>
					<div>
						<img
							src="https://source.unsplash.com/featured/?computer,exam,quiet"
							alt="Upcoming quiet and secure exam room"
							className="h-72 w-full rounded-sm object-cover shadow-sm"
						/>
					</div>
				</div>

				<div className="mt-12 grid items-center gap-10 bg-gray-50 p-6 md:grid-cols-2 md:p-10">
					<div className="md:order-2">
						<h2 className="mb-4 font-serif text-3xl text-debutron-navy">Accessibility Planned from Day One</h2>
						<p className="font-sans leading-relaxed text-gray-700">
							True to Debutron Lab&apos;s mission, our future testing facility will be fully equipped to support candidates requiring accommodations, including optimized lighting and accessible workstations for individuals with visual impairments.
						</p>
					</div>
					<div className="md:order-1">
						<img
							src="https://source.unsplash.com/featured/?accessible,keyboard,monitor"
							alt="Accessible workstation design concept"
							className="h-72 w-full rounded-sm object-cover shadow-sm"
						/>
					</div>
				</div>
			</section>

			<section className="px-6 pb-16">
				<h2 className="mb-10 text-center font-serif text-3xl text-debutron-navy">Certifications We Will Administer</h2>
				<div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
					{certifications.map((item) => (
						<div key={item} className="rounded-sm border border-gray-200 bg-white p-6 text-center shadow-sm">
							<p className="font-sans font-semibold text-debutron-charcoal">{item}</p>
						</div>
					))}
				</div>
			</section>

			<section className="border-t border-gray-200 bg-gray-100 px-6 py-16 text-center">
				<h2 className="mb-6 font-serif text-2xl text-debutron-navy">Be the first to know when our testing center opens.</h2>
				<form className="mx-auto flex max-w-md flex-col items-center justify-center gap-3 sm:max-w-none sm:flex-row" onSubmit={(event) => event.preventDefault()}>
					<input
						type="email"
						placeholder="Enter your email"
						className="w-64 rounded-l-sm border border-gray-300 px-4 py-3 font-sans focus:border-debutron-navy focus:outline-none"
					/>
					<button
						type="submit"
						className="rounded-r-sm bg-debutron-navy px-6 py-3 font-sans font-bold text-white transition-colors hover:bg-debutron-charcoal"
					>
						Notify Me
					</button>
				</form>
			</section>
		</div>
	)
}

export default PearsonVue
