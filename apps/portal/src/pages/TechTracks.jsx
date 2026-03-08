import { Link } from 'react-router-dom'

function TechTracks() {
	const techTracks = [
		{
			title: 'Applied Data Science',
			desc: 'Master the mathematical foundations of machine learning and build enterprise-grade predictive models.',
			link: '/programs/data-science',
		},
		{
			title: 'Full-Stack Software Engineering',
			desc: 'Architect scalable, secure, and modern web applications from the database to the user interface.',
			link: '/programs/software-engineering',
		},
		{
			title: 'Data Analytics & Insights',
			desc: 'Transform raw data into strategic business intelligence using industry-standard visualization tools.',
			link: '/programs/data-analytics',
		},
		{
			title: 'Cloud Infrastructure & Engineering',
			desc: 'Architect, deploy, and scale the enterprise infrastructures of tomorrow using AWS and Azure.',
			link: '/programs/cloud-engineering',
		},
		{
			title: 'Cyber Defense & Security',
			desc: 'Protect critical data, identify vulnerabilities, and engineer robust security architectures.',
			link: '/programs/cyber-security',
		},
	]

	return (
		<div className="bg-gray-50 text-debutron-charcoal">
			<section className="bg-debutron-navy px-6 py-20 text-center text-white">
				<h1 className="mb-4 font-serif text-4xl font-bold md:text-5xl">Tech Innovation Tracks</h1>
				<p className="mx-auto max-w-3xl font-sans text-lg text-gray-200">
					Rigorous, applied engineering programs designed to transform ambitious students into elite digital leaders and innovators.
				</p>
			</section>

			<section className="mx-auto max-w-7xl bg-gray-50 px-6 py-16">
				<div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
					{techTracks.map((track) => (
						<article key={track.title} className="flex h-full flex-col border-t-4 border-debutron-navy bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
							<h2 className="mb-4 font-serif text-2xl font-bold text-debutron-navy">{track.title}</h2>
							<p className="mb-8 flex-grow font-sans leading-relaxed text-gray-700">{track.desc}</p>
							<Link to={track.link} className="font-sans font-bold text-debutron-navy hover:underline">
								Read More →
							</Link>
						</article>
					))}
				</div>
			</section>

			<section className="border-t border-gray-200 bg-white py-16 text-center">
				<h3 className="mb-6 font-serif text-3xl text-debutron-navy">Ready to take the entrance assessment?</h3>
				<Link
					to="/admissions"
					className="rounded-sm bg-debutron-navy px-8 py-3 font-sans text-white transition-colors hover:bg-debutron-charcoal"
				>
					Apply Now
				</Link>
			</section>
		</div>
	)
}

export default TechTracks