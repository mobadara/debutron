function InnovationLab() {
	return (
		<section className="route-page bg-white">
			<section
				className="relative bg-cover bg-center"
				style={{ backgroundImage: 'url(https://source.unsplash.com/featured/?modern,computer,lab,university)' }}
			>
				<div className="absolute inset-0 bg-black/60" aria-hidden="true" />
				<div className="relative mx-auto max-w-7xl px-6 py-28 text-center text-white">
					<h1 className="font-serif text-4xl font-bold md:text-5xl">The Innovation Lab</h1>
					<p className="mx-auto mt-4 max-w-2xl font-sans text-lg">
						Where inclusive design meets cutting-edge infrastructure.
					</p>
				</div>
			</section>

			<section className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-6 py-20 md:flex-row">
				<img
					src="https://source.unsplash.com/featured/?assistive,technology,computer"
					alt="Adaptive learning technology and ergonomic computer workstations"
					className="h-96 w-full rounded-sm border border-gray-200 object-cover shadow-md md:w-1/2"
				/>
				<div className="md:w-1/2">
					<h2 className="mb-6 font-serif text-3xl text-debutron-navy">Adaptive Digital Displays &amp; Ergonomics</h2>
					<p className="font-sans leading-relaxed text-debutron-charcoal">
						Our labs are fitted with specialized, high-contrast smart displays designed for students with low vision. We prioritize ergonomic seating, adjustable lighting, and screen-reader-integrated workstations to ensure physical comfort supports academic focus.
					</p>
				</div>
			</section>

			<section className="bg-gray-50 py-20">
				<div className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-6 md:flex-row">
					<div className="md:w-1/2">
						<h2 className="mb-6 font-serif text-3xl text-debutron-navy">Enterprise-Grade Infrastructure</h2>
						<p className="font-sans leading-relaxed text-debutron-charcoal">
							Students in our Data Science, AI, and Cloud tracks train on high-performance machines capable of handling complex datasets and model training. We simulate real-world tech environments to ensure industry readiness.
						</p>
					</div>
					<img
						src="https://source.unsplash.com/featured/?server,hardware,datacenter"
						alt="High-performance computing and enterprise-grade hardware"
						className="h-96 w-full rounded-sm border border-gray-200 object-cover shadow-md md:w-1/2"
					/>
				</div>
			</section>

			<section className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-6 py-20 md:flex-row">
				<img
					src="https://source.unsplash.com/featured/?students,collaboration,technology"
					alt="Students collaborating in breakout innovation spaces"
					className="h-96 w-full rounded-sm border border-gray-200 object-cover shadow-md md:w-1/2"
				/>
				<div className="md:w-1/2">
					<h2 className="mb-6 font-serif text-3xl text-debutron-navy">Collaborative Hubs</h2>
					<p className="font-sans leading-relaxed text-debutron-charcoal">
						Innovation rarely happens in isolation. Our facility includes dedicated breakout spaces designed for team projects, peer-to-peer coding sessions, and whiteboard ideation.
					</p>
				</div>
			</section>
		</section>
	)
}

export default InnovationLab
