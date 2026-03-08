import { Link } from 'react-router-dom'

function CyberSecurity() {
	return (
		<div className="bg-white text-debutron-charcoal">
			<section className="bg-debutron-charcoal px-6 py-20 text-center text-white">
				<div className="mx-auto max-w-5xl">
					<h1 className="mb-4 font-serif text-4xl font-bold md:text-5xl">Cyber Defense &amp; Security</h1>
					<p className="mx-auto max-w-2xl font-sans text-lg text-gray-300">
						Protect critical data, identify vulnerabilities, and engineer robust security architectures against modern digital threats.
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
							className="rounded-sm border border-gray-400 px-6 py-3 text-white transition-colors hover:bg-white/10"
						>
							Get More Details
						</Link>
					</div>
				</div>
			</section>

			<section className="mx-auto max-w-6xl px-6 py-16">
				<div className="space-y-12">
					<div className="grid items-start gap-6 md:grid-cols-2">
						<h2 className="mb-4 font-serif text-3xl text-debutron-navy">The Analytical Foundation</h2>
						<p className="font-sans leading-relaxed text-gray-700">
							Security is essentially advanced problem-solving. We leverage CS50 concepts to ensure students understand how memory, applications, and networks function at a fundamental level—because you cannot protect what you do not deeply understand.
						</p>
					</div>
					<div className="grid items-start gap-6 md:grid-cols-2">
						<p className="font-sans leading-relaxed text-gray-700 md:order-1">
							Students learn to think like adversaries to build better defenses. The curriculum covers ethical hacking, penetration testing methodologies, and writing custom Python scripts to automate threat detection and vulnerability scanning.
						</p>
						<h2 className="mb-4 font-serif text-3xl text-debutron-navy md:order-2">Threat Hunting &amp; Defense</h2>
					</div>
				</div>

				<div className="mt-8 rounded-sm border border-gray-100 bg-white px-6 py-16 shadow-sm">
					<h2 className="mb-10 text-center font-serif text-3xl text-debutron-navy">What You Will Learn</h2>
					<ul className="grid gap-4 font-sans text-gray-700 md:grid-cols-2 lg:grid-cols-3">
						<li className="flex items-start gap-3 rounded-sm border border-gray-200 bg-gray-50 p-4">
							<span className="mt-1 h-2.5 w-2.5 rounded-full bg-debutron-navy" aria-hidden="true" />
							<span>Network protocols, packet analysis, and cryptography.</span>
						</li>
						<li className="flex items-start gap-3 rounded-sm border border-gray-200 bg-gray-50 p-4">
							<span className="mt-1 h-2.5 w-2.5 rounded-full bg-debutron-navy" aria-hidden="true" />
							<span>Vulnerability assessment and penetration testing.</span>
						</li>
						<li className="flex items-start gap-3 rounded-sm border border-gray-200 bg-gray-50 p-4">
							<span className="mt-1 h-2.5 w-2.5 rounded-full bg-debutron-navy" aria-hidden="true" />
							<span>Security Operations Center (SOC) incident response.</span>
						</li>
						<li className="flex items-start gap-3 rounded-sm border border-gray-200 bg-gray-50 p-4">
							<span className="mt-1 h-2.5 w-2.5 rounded-full bg-debutron-navy" aria-hidden="true" />
							<span>Automating security protocols using Python.</span>
						</li>
						<li className="flex items-start gap-3 rounded-sm border border-gray-200 bg-gray-50 p-4">
							<span className="mt-1 h-2.5 w-2.5 rounded-full bg-debutron-navy" aria-hidden="true" />
							<span>Securing enterprise cloud infrastructure.</span>
						</li>
					</ul>

					<div className="mx-auto mt-12 max-w-4xl rounded-sm border-l-4 border-debutron-navy bg-gray-100 p-6 text-debutron-charcoal">
						<p className="font-sans leading-relaxed">
							Career Validation: This curriculum rigorously prepares students for global standards. Top performers are eligible for institutionally sponsored certification vouchers (such as CompTIA Security+ or Microsoft Security) to validate their expertise.
						</p>
					</div>
				</div>
			</section>
		</div>
	)
}

export default CyberSecurity
