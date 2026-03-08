import { Link } from 'react-router-dom'

function SoftwareEngineering() {
	return (
		<div className="bg-white text-debutron-charcoal">
			<section className="bg-debutron-charcoal px-6 py-20 text-center text-white">
				<div className="mx-auto max-w-5xl">
					<h1 className="mb-4 font-serif text-4xl font-bold md:text-5xl">Full-Stack Software Engineering</h1>
					<p className="mx-auto max-w-2xl font-sans text-lg text-gray-200">
						Architect scalable, secure, and modern web applications from the database to the user interface.
					</p>
					<div className="mt-8 flex flex-wrap items-center justify-center gap-4">
						<Link
							to="/admissions"
							className="rounded-sm bg-debutron-navy px-6 py-3 font-bold text-white"
						>
							Apply Now
						</Link>
						<Link
							to="/contact"
							className="rounded-sm border border-white px-6 py-3 text-white transition-colors hover:bg-white/10"
						>
							Get More Details
						</Link>
					</div>
				</div>
			</section>

			<section className="mx-auto max-w-7xl px-6 py-16">
				<div className="grid gap-8 md:grid-cols-2">
					<article className="rounded-sm border border-gray-200 bg-white p-8 shadow-sm">
						<h2 className="mb-4 font-serif text-3xl text-debutron-navy">Theoretical Computer Science</h2>
						<p className="font-sans leading-relaxed text-gray-700">
							We rely on Harvard&apos;s CS50 materials to establish core computing concepts, paired with our rigorous Mathematics for Computer Scientists module (Sets, Logic, Truth Tables, Algebraic Structures, and Induction) to build flawless logical reasoning.
						</p>
					</article>

					<article className="rounded-sm border border-gray-200 bg-white p-8 shadow-sm">
						<h2 className="mb-4 font-serif text-3xl text-debutron-navy">Modern Development Stack</h2>
						<p className="font-sans leading-relaxed text-gray-700">
							Master JavaScript and Python to build dynamic front-end interfaces and robust back-end APIs. Manage complex data relationships using advanced SQL.
						</p>
					</article>
				</div>
			</section>

			<section className="bg-gray-50 px-6 py-16">
				<div className="mx-auto max-w-7xl">
					<h2 className="mb-8 font-serif text-3xl text-debutron-navy">What You Will Learn</h2>
					<ul className="space-y-4 font-sans text-gray-700">
						<li className="flex items-start gap-3 rounded-sm border border-gray-200 bg-white p-4 shadow-sm">
							<span className="mt-1 h-2.5 w-2.5 rounded-full bg-debutron-navy" aria-hidden="true" />
							<span>Algorithmic problem-solving and discrete mathematics.</span>
						</li>
						<li className="flex items-start gap-3 rounded-sm border border-gray-200 bg-white p-4 shadow-sm">
							<span className="mt-1 h-2.5 w-2.5 rounded-full bg-debutron-navy" aria-hidden="true" />
							<span>Building responsive UIs with modern JavaScript frameworks.</span>
						</li>
						<li className="flex items-start gap-3 rounded-sm border border-gray-200 bg-white p-4 shadow-sm">
							<span className="mt-1 h-2.5 w-2.5 rounded-full bg-debutron-navy" aria-hidden="true" />
							<span>Architecting RESTful APIs and backend services using Python.</span>
						</li>
						<li className="flex items-start gap-3 rounded-sm border border-gray-200 bg-white p-4 shadow-sm">
							<span className="mt-1 h-2.5 w-2.5 rounded-full bg-debutron-navy" aria-hidden="true" />
							<span>Database design, schema architecture, and SQL querying.</span>
						</li>
						<li className="flex items-start gap-3 rounded-sm border border-gray-200 bg-white p-4 shadow-sm">
							<span className="mt-1 h-2.5 w-2.5 rounded-full bg-debutron-navy" aria-hidden="true" />
							<span>Version control, deployment pipelines, and agile methodologies.</span>
						</li>
					</ul>
				</div>
			</section>
		</div>
	)
}

export default SoftwareEngineering
