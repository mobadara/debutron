import { Link } from 'react-router-dom'

function DataAnalytics() {
	return (
		<div className="bg-white text-debutron-charcoal">
			<section className="border-b border-gray-200 bg-gray-100 px-6 py-20 text-center text-debutron-navy">
				<div className="mx-auto max-w-5xl">
					<h1 className="mb-4 font-serif text-4xl font-bold md:text-5xl">Data Analytics &amp; Insights</h1>
					<p className="mx-auto max-w-2xl font-sans text-lg text-gray-700">
						Transform raw data into strategic business intelligence using industry-standard visualization and statistical tools.
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
							className="rounded-sm border border-debutron-navy px-6 py-3 text-debutron-navy transition-colors hover:bg-debutron-navy/10"
						>
							Get More Details
						</Link>
					</div>
				</div>
			</section>

			<section className="mx-auto max-w-6xl px-6 py-16">
				<div className="space-y-10">
					<div className="grid items-start gap-6 md:grid-cols-2">
						<h2 className="font-serif text-3xl text-debutron-navy">The Analytical Foundation</h2>
						<p className="font-sans leading-relaxed text-gray-700">
							Analytics begins with statistics. Students master probability, variance, and inferential statistics to ensure their insights are mathematically sound before touching a single visualization tool.
						</p>
					</div>
					<div className="grid items-start gap-6 md:grid-cols-2">
						<p className="font-sans leading-relaxed text-gray-700 md:order-1">
							Execute complex data wrangling and visualization using Microsoft Excel, SQL, and Python/R. Capstone projects require students to build interactive, executive-ready dashboards using Microsoft Power BI.
						</p>
						<h2 className="font-serif text-3xl text-debutron-navy md:order-2">The Tooling Ecosystem</h2>
					</div>
				</div>

				<div className="mt-8 rounded-sm border border-gray-100 bg-white px-6 py-12 shadow-sm">
					<h3 className="mb-6 font-serif text-2xl text-debutron-navy">What You Will Learn</h3>
					<ul className="space-y-4 font-sans text-gray-700">
						<li className="flex items-start gap-3">
							<span className="mt-1 h-2.5 w-2.5 rounded-full bg-debutron-navy" aria-hidden="true" />
							<span>Statistical analysis and data storytelling.</span>
						</li>
						<li className="flex items-start gap-3">
							<span className="mt-1 h-2.5 w-2.5 rounded-full bg-debutron-navy" aria-hidden="true" />
							<span>Advanced Microsoft Excel functions and macros.</span>
						</li>
						<li className="flex items-start gap-3">
							<span className="mt-1 h-2.5 w-2.5 rounded-full bg-debutron-navy" aria-hidden="true" />
							<span>Querying relational databases with SQL.</span>
						</li>
						<li className="flex items-start gap-3">
							<span className="mt-1 h-2.5 w-2.5 rounded-full bg-debutron-navy" aria-hidden="true" />
							<span>Designing interactive dashboards in Microsoft Power BI.</span>
						</li>
					</ul>

					<div className="mt-8 rounded-sm bg-debutron-navy p-6 text-center text-white">
						<p className="font-sans leading-relaxed">
							Outstanding students may be nominated for fully-funded Microsoft Certification vouchers (e.g., PL-300 Power BI Data Analyst) to officially validate their expertise.
						</p>
					</div>
				</div>
			</section>
		</div>
	)
}

export default DataAnalytics
