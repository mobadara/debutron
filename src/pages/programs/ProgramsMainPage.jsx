import { Link } from 'react-router-dom'
import { BookOpen, Laptop } from 'lucide-react'

function ProgramsMainPage() {
	return (
		<section className="route-page">
			<div className="section-head">
				<h2>Academics & Career Pathways</h2>
				<p>
					Choose the learning path that fits your goals, from exam success pathways to practical digital career
					training.
				</p>
			</div>

			<div className="program-cards-grid">
				<article className="program-card">
					<img
						src="https://images.unsplash.com/photo-1427504494785-a4f97bc25f2d?w=1200&h=800&fit=crop"
						alt="Students preparing for examinations"
						className="program-card-image"
					/>
					<h3>
						<BookOpen className="icon-title" aria-hidden="true" />
						Exam Mastery Academy
					</h3>
					<p>
						Structured academic coaching for WASSCE, NECO, GCE, A-Level, and UTME, delivered with close
						mentorship and progress tracking.
					</p>
					<ul>
						<li>Subject-by-subject exam reinforcement</li>
						<li>A-Level Classes</li>
						<li>Mock exams and revision clinics</li>
					</ul>
					<Link to="/programs/academics" className="primary-btn">
						Explore Pathway
					</Link>
				</article>

				<article className="program-card">
					<img
						src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=800&fit=crop"
						alt="Learners collaborating on digital skills training"
						className="program-card-image"
					/>
					<h3>
						<Laptop className="icon-title" aria-hidden="true" />
						Digital Career Accelerator
					</h3>
					<p>
						Hands-on technology training built for modern employability, including software engineering,
						data analytics, cyber security, and cloud tools.
					</p>
					<ul>
						<li>Project-based, portfolio-first training</li>
						<li>Software Engineering</li>
						<li>Flexible online or on-site delivery</li>
					</ul>
					<Link to="/programs/ict" className="primary-btn">
						Explore Pathway
					</Link>
				</article>
			</div>
		</section>
	)
}

export default ProgramsMainPage
