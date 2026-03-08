import { Link } from 'react-router-dom'
import { Clock, MapPin } from 'lucide-react'
import { ictTracks } from '../../data/siteContent'

function IctPage() {
	return (
		<section className="route-page programs-grid">
			<div className="section-head">
				<h2>Digital Career Accelerator - Online & On-site Training</h2>
				<p>
					Learn in-demand tech skills with flexible delivery. Choose between online or on-site learning based
					on your schedule and preferences.
				</p>
			</div>

			<div className="program-cards-grid">
				{ictTracks.map((track) => (
					<article className="program-card" key={track.id}>
						<img src={track.image} alt={track.title} className="program-card-image" />
						<h3>{track.title}</h3>
						{track.subtitle && <p className="subtitle">{track.subtitle}</p>}
						<p className="description">{track.description}</p>
						<div className="program-meta">
							<span className="duration">
								<Clock className="meta-icon" aria-hidden="true" />
								{track.duration}
							</span>
							<span className="mode">
								<MapPin className="meta-icon" aria-hidden="true" />
								{track.mode}
							</span>
						</div>
						<Link to={`/programs/${track.id}`} className="cta-link">
							{track.cta} →
						</Link>
					</article>
				))}
			</div>
		</section>
	)
}

export default IctPage
