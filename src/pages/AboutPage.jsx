function AboutPage() {
	return (
		<main className="bg-debutron-gray px-6 py-14 md:px-12">
			<div className="mx-auto max-w-7xl space-y-14">
				<section className="grid items-stretch gap-8 rounded border border-slate-200 bg-debutron-white p-6 md:grid-cols-2 md:p-10">
					<div className="overflow-hidden rounded">
						<img
							src="https://source.unsplash.com/featured/?inclusive,education,technology"
							alt="Inclusive technology education environment"
							className="h-full w-full object-cover"
						/>
					</div>
					<div>
						<h1 className="font-serif text-4xl text-debutron-navy">Our Story</h1>
						<p className="mt-5 font-sans text-base leading-relaxed text-debutron-charcoal">
							Debutron Lab was born from a deep-seated belief that world-class tech education and rigorous academic prep must be accessible, inclusive, and fundamentally sound. Founded by an AI Engineer and seasoned STEM educator who understands firsthand the unique classroom challenges faced by students with albinism, Debutron Lab was built to bridge the gap between accessibility and excellence. We rely on advanced digital teaching aids to ensure every student has the visual and structural support they need to succeed. Furthermore, we believe that true tech innovation cannot exist without a strong foundation. That is why our technology tracks integrate core disciplines like Mathematics, Statistics, Physics, and Algorithms. At Debutron Lab, we don't just teach students how to use technology; we empower them to understand the science behind it and build the digital products of tomorrow.
						</p>
					</div>
				</section>

				<section>
					<h2 className="font-serif text-3xl text-debutron-navy">Vision &amp; Mission</h2>
					<div className="mt-6 grid gap-6 md:grid-cols-2">
						<article className="rounded border border-slate-200 bg-debutron-white p-7 shadow-md transition hover:shadow-lg">
							<h3 className="font-serif text-2xl text-debutron-navy">Vision</h3>
							<p className="mt-4 font-sans text-base leading-relaxed text-debutron-charcoal">
								To be Africa’s premier inclusive innovation hub, where rigorous academic foundations and advanced tech education converge to empower the next generation of digital leaders, engineers, and creators.
							</p>
						</article>

						<article className="rounded border border-slate-200 bg-debutron-white p-7 shadow-md transition hover:shadow-lg">
							<h3 className="font-serif text-2xl text-debutron-navy">Mission</h3>
							<p className="mt-4 font-sans text-base leading-relaxed text-debutron-charcoal">
								To deliver highly accessible, premium education through digital teaching aids, seamlessly blending core STEM disciplines with cutting-edge ICT skills. We are committed to fostering an inclusive environment that breaks down learning barriers, producing industry-ready professionals who graduate with comprehensive academic transcripts, robust portfolios, and the capability to build transformative digital solutions.
							</p>
						</article>
					</div>
				</section>

				<section>
					<h2 className="font-serif text-3xl text-debutron-navy">Core Values</h2>
					<div className="mt-6 grid gap-6 md:grid-cols-2">
						<article className="rounded border border-slate-200 bg-debutron-white p-7">
							<h3 className="font-serif text-2xl text-debutron-navy">Inclusive Excellence</h3>
							<p className="mt-3 font-sans text-base leading-relaxed text-debutron-charcoal">
								Breaking down visual and systemic barriers to learning through specialized programs and digital aids, ensuring no brilliant mind is left behind.
							</p>
						</article>

						<article className="rounded border border-slate-200 bg-debutron-white p-7">
							<h3 className="font-serif text-2xl text-debutron-navy">Foundational Rigor</h3>
							<p className="mt-3 font-sans text-base leading-relaxed text-debutron-charcoal">
								Operating on the truth that enduring tech skills require a deep, transcript-validated understanding of Mathematics, Physics, and Data Structures.
							</p>
						</article>

						<article className="rounded border border-slate-200 bg-debutron-white p-7">
							<h3 className="font-serif text-2xl text-debutron-navy">Applied Innovation</h3>
							<p className="mt-3 font-sans text-base leading-relaxed text-debutron-charcoal">
								Moving strictly beyond theory by requiring students to build, publish, and launch real-world applications and AI models before they graduate.
							</p>
						</article>

						<article className="rounded border border-slate-200 bg-debutron-white p-7">
							<h3 className="font-serif text-2xl text-debutron-navy">Transparent Merit</h3>
							<p className="mt-3 font-sans text-base leading-relaxed text-debutron-charcoal">
								Validating hard work and intellectual growth not just with certificates of competence, but with comprehensive academic transcripts detailing every subject mastered.
							</p>
						</article>
					</div>
				</section>
			</div>
		</main>
	)
}

export default AboutPage
