import { Link } from 'react-router-dom'

function DataScience() {
	return (
		<div className="bg-white text-debutron-charcoal">
			<section className="bg-debutron-navy px-6 py-20 text-center text-white">
				<div className="mx-auto max-w-5xl">
					<h1 className="mb-4 font-serif text-4xl font-bold md:text-5xl">Applied Data Science</h1>
					<p className="mx-auto max-w-2xl font-sans text-lg text-gray-200">
						Master the mathematical foundations of machine learning and build enterprise-grade predictive models.
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

			<section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-2">
				<div>
					<h2 className="mb-6 font-serif text-3xl text-debutron-navy">Mathematical &amp; Statistical Foundations</h2>
					<p className="font-sans text-gray-700">
						Enduring AI skills require mathematical fluency. This track begins with rigorous theoretical coursework.
					</p>
					<ul className="mt-4 list-disc space-y-2 pl-5 font-sans text-gray-700">
						<li>Mathematics for Computer Scientists: Sets, Relations, Functions, Mappings, and Logic.</li>
						<li>Algebraic Structures: Groups, Rings, Fields, and Partially Ordered Sets.</li>
						<li>
							Advanced Calculus &amp; Linear Algebra: Sequences, Series, Mathematical Induction, and Matrix Operations.
						</li>
						<li>Statistical Methods: Probability distributions and inferential statistics.</li>
					</ul>
				</div>

				<div>
					<h2 className="mb-6 font-serif text-3xl text-debutron-navy">Tech Stack &amp; Global Integrations</h2>
					<p className="font-sans text-gray-700">
						Theory is immediately applied through our world-class institutional integrations.
					</p>
					<ul className="mt-4 list-disc space-y-2 pl-5 font-sans text-gray-700">
						<li>Core Languages: Deep immersion in Python, R, and SQL.</li>
						<li>
							WorldQuant University Integration: Mandatory completion of the WQU Applied Data Science Lab and Applied AI Lab for portfolio building.
						</li>
						<li>DataCamp Partnership: Interactive skill validation through the DataCamp platform.</li>
						<li>CS50 Integration: Leveraging Harvard&apos;s CS50 materials for algorithmic thinking.</li>
					</ul>
				</div>
			</section>

			<section className="bg-gray-50 px-6 py-16">
				<div className="mx-auto max-w-7xl">
					<h2 className="mb-10 text-center font-serif text-3xl text-debutron-navy">What You Will Learn</h2>
					<div className="grid gap-6 md:grid-cols-3">
						<article className="rounded-sm border border-gray-200 bg-white p-6 shadow-sm">
							<p className="font-sans text-gray-700">Data Engineering pipelines and SQL database management.</p>
						</article>
						<article className="rounded-sm border border-gray-200 bg-white p-6 shadow-sm">
							<p className="font-sans text-gray-700">Exploratory Data Analysis (EDA) and statistical modeling.</p>
						</article>
						<article className="rounded-sm border border-gray-200 bg-white p-6 shadow-sm">
							<p className="font-sans text-gray-700">
								Deploying Machine Learning models (Regression, Classification, Neural Networks).
							</p>
						</article>
					</div>
				</div>
			</section>
		</div>
	)
}

export default DataScience