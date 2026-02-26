import { IdCard, Linkedin, Mail, Twitter } from 'lucide-react'
import { staffDirectory } from '../data/siteContent'

function StaffDirectoryPage() {
	return (
		<section className="route-page">
			<div className="section-head">
				<h2>Staff Directory</h2>
				<p>Meet the dedicated professionals who make Debutron Lab a center of excellence in education, technology, and innovation.</p>
			</div>

			<div className="staff-grid">
				{staffDirectory.map((staff, idx) => (
					<article key={idx} className="staff-card">
						<div className="staff-headshot">
							<div className="avatar-placeholder">
								{staff.name.split(' ').map(n => n[0]).join('')}
							</div>
						</div>
						<div className="staff-info">
							<h3>{staff.name}</h3>
							<p className="staff-role">{staff.role}</p>
							<p className="staff-bio">{staff.bio}</p>
							
							<div className="staff-links">
								{staff.orcid && (
									<a href={staff.orcid} target="_blank" rel="noopener noreferrer" className="staff-link" aria-label={`${staff.name}'s ORCID profile`}>
										<IdCard className="link-icon" aria-hidden="true" />
										ORCID
									</a>
								)}
								{staff.linkedin && (
									<a href={staff.linkedin} target="_blank" rel="noopener noreferrer" className="staff-link" aria-label={`${staff.name}'s LinkedIn profile`}>
										<Linkedin className="link-icon" aria-hidden="true" />
										LinkedIn
									</a>
								)}
								{staff.twitter && (
									<a href={staff.twitter} target="_blank" rel="noopener noreferrer" className="staff-link" aria-label={`${staff.name}'s Twitter profile`}>
										<Twitter className="link-icon" aria-hidden="true" />
										Twitter
									</a>
								)}
								{staff.email && (
									<a href={`mailto:${staff.email}`} className="staff-link" aria-label={`Email ${staff.name}`}>
										<Mail className="link-icon" aria-hidden="true" />
										Email
									</a>
								)}
							</div>
						</div>
					</article>
				))}
			</div>
		</section>
	)
}

export default StaffDirectoryPage
