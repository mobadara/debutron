import { Link } from 'react-router-dom'

function EnterpriseConsulting() {
	const services = [
		{
			title: 'Data Analytics & Business Intelligence',
			description:
				'Stop guessing. We help organizations unlock the hidden value in their data through advanced analytics, creating dynamic dashboards and predictive models that drive executive decision-making.',
			image: 'https://source.unsplash.com/featured/?data,dashboard,analytics',
			alt: 'Business analytics dashboards and strategic data review',
		},
		{
			title: 'Cloud Infrastructure & Security',
			description:
				'Modernize your operations. Our engineers design, deploy, and secure robust cloud infrastructures using industry-standard platforms to ensure your data is scalable, accessible, and protected.',
			image: 'https://source.unsplash.com/featured/?cloud,security,infrastructure',
			alt: 'Cloud infrastructure and security architecture planning',
		},
		{
			title: 'Custom Machine Learning Solutions',
			description:
				'Tailored intelligence. Whether you need a sophisticated churn prediction model or an automated customer service algorithm, we build and deploy AI solutions custom-fitted to your operational bottlenecks.',
			image: 'https://source.unsplash.com/featured/?machine-learning,ai,enterprise',
			alt: 'Custom enterprise AI and machine learning solution development',
		},
	]

	return (
		<div className="bg-white text-debutron-charcoal">
			<section
				className="relative bg-cover bg-center px-6 py-24"
				style={{ backgroundImage: "url('https://source.unsplash.com/featured/?corporate,meeting,data')" }}
			>
				<div className="absolute inset-0 bg-black/60" aria-hidden="true" />
				<div className="relative mx-auto max-w-6xl">
					<h1 className="mb-4 max-w-4xl font-serif text-4xl font-bold text-white md:text-5xl">
						Transform Your Enterprise with Data-Driven Precision
					</h1>
					<p className="max-w-2xl font-sans text-xl text-gray-100">
						Strategic advisory, cloud architecture, and custom AI integration for forward-thinking organizations.
					</p>
				</div>
			</section>

			<section className="mx-auto flex max-w-7xl flex-col gap-16 px-6 py-16">
				{services.map((service, index) => {
					const isImageFirst = index % 2 === 1

					return (
						<article key={service.title} className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
							<div className={isImageFirst ? 'md:order-2' : ''}>
								<h2 className="font-serif text-3xl text-debutron-navy">{service.title}</h2>
								<p className="mt-4 font-sans leading-relaxed text-gray-700">{service.description}</p>
							</div>
							<div className={isImageFirst ? 'md:order-1' : ''}>
								<img
									src={service.image}
									alt={service.alt}
									className="h-72 w-full rounded-sm object-cover md:h-80"
								/>
							</div>
						</article>
					)
				})}
			</section>

			<section className="bg-debutron-charcoal px-6 py-16 text-center text-white">
				<div className="mx-auto max-w-4xl">
					<p className="font-serif text-2xl md:text-3xl">
						Ready to scale your technical capabilities? Partner with Debutron Lab.
					</p>
					<Link
						to="/contact"
						className="mt-6 inline-block bg-white px-8 py-3 font-sans font-bold text-debutron-navy transition-colors hover:bg-gray-200"
					>
						Schedule a Consultation
					</Link>
				</div>
			</section>
		</div>
	)
}

export default EnterpriseConsulting
