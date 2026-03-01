function Careers() {
	return (
		<section className="route-page bg-white">
			<section
				className="relative bg-cover bg-center"
				style={{ backgroundImage: 'url(https://source.unsplash.com/featured/?diverse,professionals,collaboration)' }}
			>
				<div className="absolute inset-0 bg-black/55" aria-hidden="true" />
				<div className="relative mx-auto max-w-6xl px-6 py-28 text-center">
					<h1 className="font-serif text-5xl text-white">Join Our Mission</h1>
					<p className="mx-auto mt-5 max-w-3xl font-sans text-lg text-white/95">
						Help us shape the future of inclusive tech education in Africa.
					</p>
				</div>
			</section>

			<section className="mx-auto max-w-4xl bg-white px-6 py-20 text-center">
				<h2 className="mb-8 font-serif text-3xl text-debutron-navy">Why Build With Us?</h2>
				<p className="font-sans text-lg leading-relaxed text-gray-700">
					We are looking for visionary educators, empathetic engineers, and administrative leaders who believe that brilliance has no boundaries. At Debutron Lab, you won't just teach or code; you will build pathways for students who have historically been overlooked.
				</p>
			</section>

			<section className="bg-gray-50 px-6 py-20 text-center">
				<div className="mx-auto max-w-4xl">
					<h2 className="mb-6 font-serif text-2xl text-debutron-navy">Current Opportunities</h2>
					<p className="font-sans text-lg leading-relaxed text-gray-700">
						While we do not have specific roles open at this moment, we are always eager to connect with exceptional talent aligned with our mission.
					</p>
					<a
						href="mailto:careers@debutronlab.com"
						className="mt-8 inline-block rounded-sm bg-debutron-navy px-8 py-3 font-sans font-semibold text-white transition-colors hover:bg-debutron-charcoal"
					>
						Submit Your CV for Future Consideration
					</a>
				</div>
			</section>
		</section>
	)
}

export default Careers
