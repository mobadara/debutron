import { useParams, Link } from 'react-router-dom'
import { allPrograms } from '../../data/public/programsData'

function ProgramDetailPage() {
	const { programId } = useParams()
	const program = allPrograms.find((p) => p.id === programId)

	if (!program) {
		return (
			<section className="route-page">
				<h2>Program Not Found</h2>
				<Link to="/programs">Back to Programs</Link>
			</section>
		)
	}

	return (
		<section className="route-page program-detail">
			<div className="detail-hero">
				<img src={program.image} alt={program.title} className="detail-image" />
			</div>

			<div className="detail-content">
				<h1>{program.title}</h1>
				{program.subtitle && <p className="subtitle">{program.subtitle}</p>}
				<p className="lead">{program.fullDescription}</p>

				{(program.duration || program.mode || program.price) && (
					<div className="program-info">
						{program.duration && (
							<div className="info-item">
								<strong>Duration:</strong> {program.duration}
							</div>
						)}
						{program.mode && (
							<div className="info-item">
								<strong>Mode:</strong> {program.mode}
							</div>
						)}
						{program.price && (
							<div className="info-item">
								<strong>Cost:</strong> {program.price}
							</div>
						)}
					</div>
				)}

				<div className="features-section">
					<h2>What You'll Learn</h2>
					<ul className="features-list">
						{program.features.map((feature) => (
							<li key={feature}>{feature}</li>
						))}
					</ul>
				</div>

				<div className="cta-section">
					<a href="/contact" className="primary-btn">
						{program.cta || 'Enroll Now'}
					</a>
					<Link to="/programs" className="secondary-btn">
						Back to Programs
					</Link>
				</div>
			</div>
		</section>
	)
}

export default ProgramDetailPage
