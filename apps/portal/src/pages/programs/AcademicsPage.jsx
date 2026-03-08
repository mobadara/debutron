import { Link } from 'react-router-dom'
import { academicTracks } from '../../data/siteContent'

function AcademicsPage() {
	return (
		<section className="route-page programs-grid">
			<div className="section-head">
				<h2>Academics - On-site Programs</h2>
				<p>
					Build a strong academic foundation with our focused, results-driven programs. All programs are
					delivered on-site with close mentoring and personalized support.
				</p>
			</div>

			<div className="program-cards-grid">
				{academicTracks.map((track) => (
					<article className="program-card" key={track.id}>
						<img src={track.image} alt={track.title} className="program-card-image" />
						<h3>{track.title}</h3>
						<p className="description">{track.description}</p>
						<ul className="highlights">
							{track.features.slice(0, 2).map((feature) => (
								<li key={feature}>{feature}</li>
							))}
						</ul>
						<Link to={`/programs/${track.id}`} className="cta-link">
							{track.cta} →
						</Link>
					</article>
				))}
			</div>
		</section>
	)
}

export default AcademicsPage
