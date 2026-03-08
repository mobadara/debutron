import { Link } from 'react-router-dom'

function CloudEngineering() {
	return (
		<div className="bg-white text-debutron-charcoal">
			<section className="bg-debutron-navy px-6 py-20 text-center text-white">
				<div className="mx-auto max-w-5xl">
					<h1 className="mb-4 font-serif text-4xl font-bold md:text-5xl">Cloud Infrastructure &amp; Engineering</h1>
					<p className="mx-auto max-w-2xl font-sans text-lg text-gray-200">
						Architect, deploy, and scale the enterprise infrastructures of tomorrow using industry-leading cloud platforms.
					</p>
					<div className="mt-8 flex flex-wrap items-center justify-center gap-4">
						<Link
							to="/admissions"
							className="rounded-sm bg-white px-6 py-3 font-bold text-debutron-navy"
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

			<section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2">
				<div>
					<h2 className="mb-4 font-serif text-3xl text-debutron-navy">Systems &amp; Logic</h2>
					<p className="font-sans leading-relaxed text-gray-700">
						Great cloud engineers are fundamentally great computer scientists. We integrate Harvard&apos;s CS50 methodologies to build a deep understanding of memory, data structures, and networking protocols before ever touching a cloud console. Students master Python scripting to automate complex server deployments.
					</p>
				</div>

				<div>
					<h2 className="mb-4 font-serif text-3xl text-debutron-navy">Platform Engineering</h2>
					<p className="font-sans leading-relaxed text-gray-700">
						Theory transitions to applied engineering within Amazon Web Services (AWS) and Microsoft Azure environments. Students learn Infrastructure as Code (IaC), containerization, and how to build highly available, fault-tolerant architectures.
					</p>
				</div>
			</section>

			<section className="border-t border-gray-200 bg-gray-50 px-6 py-16">
				<div className="mx-auto max-w-7xl">
					<h2 className="mb-10 text-center font-serif text-3xl text-debutron-navy">What You Will Learn</h2>
					<ul className="grid gap-4 font-sans text-gray-700 md:grid-cols-2 lg:grid-cols-3">
						<li className="flex items-start gap-3 rounded-sm border border-gray-200 bg-white p-4 shadow-sm">
							<span className="mt-1 h-2.5 w-2.5 rounded-full bg-debutron-navy" aria-hidden="true" />
							<span>Linux system administration and shell scripting.</span>
						</li>
						<li className="flex items-start gap-3 rounded-sm border border-gray-200 bg-white p-4 shadow-sm">
							<span className="mt-1 h-2.5 w-2.5 rounded-full bg-debutron-navy" aria-hidden="true" />
							<span>Computer Science fundamentals (CS50 integration).</span>
						</li>
						<li className="flex items-start gap-3 rounded-sm border border-gray-200 bg-white p-4 shadow-sm">
							<span className="mt-1 h-2.5 w-2.5 rounded-full bg-debutron-navy" aria-hidden="true" />
							<span>Infrastructure automation using Python.</span>
						</li>
						<li className="flex items-start gap-3 rounded-sm border border-gray-200 bg-white p-4 shadow-sm">
							<span className="mt-1 h-2.5 w-2.5 rounded-full bg-debutron-navy" aria-hidden="true" />
							<span>Deploying scalable environments on AWS and Microsoft Azure.</span>
						</li>
						<li className="flex items-start gap-3 rounded-sm border border-gray-200 bg-white p-4 shadow-sm">
							<span className="mt-1 h-2.5 w-2.5 rounded-full bg-debutron-navy" aria-hidden="true" />
							<span>Database migration and cloud cost optimization.</span>
						</li>
					</ul>

					<div className="mx-auto mt-12 max-w-4xl rounded-sm bg-debutron-navy p-6 text-center text-white">
						<p className="font-sans leading-relaxed">
							Institutionally Sponsored Certification: High-performing students may be nominated for fully-funded AWS or Microsoft Azure certification vouchers to officially launch their enterprise careers.
						</p>
					</div>
				</div>
			</section>
		</div>
	)
}

export default CloudEngineering
