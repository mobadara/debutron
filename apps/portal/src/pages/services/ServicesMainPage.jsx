import { Link } from 'react-router-dom'
import { serviceItems, servicesPageData } from '../../data/public/servicesData'

function ServicesMainPage() {
	return (
		<>
			<section className="route-page services-main">
				<div className="section-head">
					<h2>{servicesPageData.title}</h2>
					<p>
						{servicesPageData.subtitle}
					</p>
				</div>

				<div className="service-cards-grid">
					{serviceItems.map((service) => (
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
