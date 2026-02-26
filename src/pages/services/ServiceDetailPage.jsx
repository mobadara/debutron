import { useParams, Link } from 'react-router-dom'
import { servicessWithDetails } from '../../data/siteContent'

function ServiceDetailPage() {
	const { serviceId } = useParams()
	const service = servicessWithDetails.find((s) => s.id === serviceId)

	if (!service) {
		return (
			<section className="route-page">
				<h2>Service Not Found</h2>
				<Link to="/services">Back to Services</Link>
			</section>
		)
	}

	return (
		<section className="route-page service-detail">
			<div className="detail-hero">
				<img src={service.image} alt={service.title} className="detail-image" />
			</div>

			<div className="detail-content">
				<h1>{service.title}</h1>
				<p className="lead">{service.fullDescription}</p>

				<div className="features-section">
					<h2>Key Features & Benefits</h2>
					<ul className="features-list">
						{service.features.map((feature) => (
							<li key={feature}>{feature}</li>
						))}
					</ul>
				</div>

				<div className="cta-section">
					<a href="/contact" className="primary-btn">
						Get in Touch
					</a>
					<Link to="/services" className="secondary-btn">
						Back to Services
					</Link>
				</div>
			</div>
		</section>
	)
}

export default ServiceDetailPage
