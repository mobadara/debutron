import { Link } from 'react-router-dom'
import { servicessWithDetails } from '../../data/siteContent'

function ServicesMainPage() {
	return (
		<>
			<section className="route-page services-main">
				<div className="section-head">
					<h2>Services & Student Support</h2>
					<p>
						Explore our active services including examination registration, educational consulting,
						and testing center readiness support.
					</p>
				</div>

				<div className="service-cards-grid">
					{servicessWithDetails.map((service) => (
						<article className="service-card" key={service.id}>
							<img src={service.image} alt={service.title} className="service-card-image" />
							<h3>{service.title}</h3>
							<p>{service.description}</p>
							<Link to={`/services/${service.id}`} className="text-link">
								Learn More →
							</Link>
						</article>
					))}
				</div>
			</section>
		</>
	)
}

export default ServicesMainPage
