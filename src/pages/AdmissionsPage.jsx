import { Link } from 'react-router-dom'
import {
	Award,
	Briefcase,
	Calendar,
	ClipboardCheck,
	CreditCard,
	FileText,
	GraduationCap,
	Laptop
} from 'lucide-react'

function AdmissionsPage() {
	return (
		<section className="route-page admissions-page">
			<div className="section-head">
				<h2>Admissions</h2>
				<p>Join Debutron Lab and transform your future through exceptional education and cutting-edge technology training.</p>
			</div>

			<div className="admissions-hero">
				<div className="admissions-hero-grid">
					<article className="info-panel admissions-summary">
						<h3>Apply Now for Academic Year 2026-2027</h3>
						<p>
							We are now accepting applications for our academic programs and ICT training cohorts.
							Whether you're seeking to improve your exam results, prepare for university entrance,
							or master modern technology skills, Debutron Lab offers the pathway you need.
						</p>
						<div className="admissions-actions">
							<Link to="/admissions" className="primary-btn">Apply Now</Link>
							<Link to="/contact" className="secondary-btn">Contact Admissions</Link>
						</div>
					</article>
					<aside className="admissions-panel">
						<div className="panel-item">
							<Calendar className="icon-title" aria-hidden="true" />
							<div>
								<strong>Application Deadline</strong>
								<p>Rolling admissions - Apply anytime</p>
							</div>
						</div>
						<div className="panel-item">
							<ClipboardCheck className="icon-title" aria-hidden="true" />
							<div>
								<strong>Next Cohort Starts</strong>
								<p>March 15, 2026 (Academic Programs)</p>
								<p>April 1, 2026 (ICT Programs)</p>
							</div>
						</div>
						<div className="panel-item">
							<FileText className="icon-title" aria-hidden="true" />
							<div>
								<strong>Required Documents</strong>
								<p>Application form, ID, and transcripts</p>
							</div>
						</div>
					</aside>
				</div>
			</div>

			<div className="admission-tracks">
				<h3 className="section-subtitle">Choose Your Track</h3>
				
				<div className="track-cards">
					<article className="track-card">
						<h4>
							<GraduationCap className="icon-title" aria-hidden="true" />
							Exam Mastery Academy
						</h4>
						<p className="track-desc">
							Excel in WASSCE/GCE, A-Level, and UTME examinations with our proven teaching methodologies 
							and experienced instructors.
						</p>
						<ul className="track-features">
							<li>Small class sizes (max 15 students)</li>
							<li>Personalized learning plans</li>
							<li>Mock exams and practice sessions</li>
							<li>One-on-one mentoring</li>
							<li>On-site learning environment</li>
						</ul>
						<div className="track-info">
							<p><strong>Duration:</strong> 6-12 months</p>
							<p><strong>Mode:</strong> On-site only</p>
							<p><strong>Start Date:</strong> March 15, 2026</p>
						</div>
						<Link to="/programs/academics" className="primary-btn">View Academic Programs</Link>
					</article>

					<article className="track-card featured">
						<div className="featured-badge">Most Popular</div>
						<h4>
							<Laptop className="icon-title" aria-hidden="true" />
							Digital Career Accelerator
						</h4>
						<p className="track-desc">
							Master in-demand technology skills including Data Science, Software Engineering, 
							Cyber Security, and Cloud Computing.
						</p>
						<ul className="track-features">
							<li>Industry-aligned curriculum</li>
							<li>Hands-on projects and portfolio building</li>
							<li>Career services and job placement support</li>
							<li>Certification preparation (AWS, Azure, etc.)</li>
							<li>Flexible online or on-site options</li>
						</ul>
						<div className="track-info">
							<p><strong>Duration:</strong> 12-16 weeks</p>
							<p><strong>Mode:</strong> Online or On-site</p>
							<p><strong>Start Date:</strong> April 1, 2026</p>
						</div>
						<Link to="/programs/ict" className="primary-btn">View ICT Programs</Link>
					</article>
				</div>
			</div>

			<div className="admissions-visuals">
				<figure className="visual-card">
					<img
						src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1200&q=80"
						alt="Students collaborating in a classroom"
					/>
					<figcaption>Small cohorts designed for personalized support.</figcaption>
				</figure>
				<figure className="visual-card">
					<img
						src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
						alt="Learner working on a laptop"
					/>
					<figcaption>Flexible training paths for academic and ICT goals.</figcaption>
				</figure>
			</div>

			<div className="admission-requirements">
				<h3 className="section-subtitle">Admission Requirements</h3>
				
				<div className="requirements-grid">
					<article className="info-panel">
						<h4>Academic Programs</h4>
						<ul>
							<li>Completed application form</li>
							<li>Previous academic transcripts</li>
							<li>Valid identification (passport, national ID)</li>
							<li>Proof of previous WASSCE/GCE/UTME results (if applicable)</li>
							<li>Entrance assessment (for A-Level)</li>
						</ul>
					</article>

					<article className="info-panel">
						<h4>ICT Programs</h4>
						<ul>
							<li>Completed application form</li>
							<li>Secondary school certificate or equivalent</li>
							<li>Basic computer literacy</li>
							<li>Resume/CV (for professional programs)</li>
							<li>Statement of purpose (optional but recommended)</li>
						</ul>
					</article>
				</div>
			</div>

			<div className="application-process">
				<h3 className="section-subtitle">Application Process</h3>
				
				<div className="process-steps">
					<div className="step-item">
						<div className="step-number">1</div>
						<h4>Submit Application</h4>
						<p>Complete the online application form and upload required documents.</p>
					</div>
					<div className="step-item">
						<div className="step-number">2</div>
						<h4>Review & Assessment</h4>
						<p>Our admissions team reviews your application. Some programs require entrance tests.</p>
					</div>
					<div className="step-item">
						<div className="step-number">3</div>
						<h4>Admission Decision</h4>
						<p>Receive your admission decision via email within 5-7 business days.</p>
					</div>
					<div className="step-item">
						<div className="step-number">4</div>
						<h4>Enrollment</h4>
						<p>Accept your offer, pay fees, and complete enrollment to secure your place.</p>
					</div>
				</div>
			</div>

			<div className="tuition-financial-aid">
				<h3 className="section-subtitle">Tuition & Financial Aid</h3>
				
				<article className="info-panel">
					<p>
						We believe quality education should be accessible. Debutron Lab offers competitive tuition rates 
						and flexible payment plans. Financial aid and scholarships are available for qualified students.
					</p>
					<div className="financial-options">
						<div className="option-item">
							<strong>
								<CreditCard className="icon-title" aria-hidden="true" />
								Payment Plans
							</strong>
							<p>Split tuition into monthly installments</p>
						</div>
						<div className="option-item">
							<strong>
								<Award className="icon-title" aria-hidden="true" />
								Merit Scholarships
							</strong>
							<p>Up to 30% tuition reduction for high achievers</p>
						</div>
						<div className="option-item">
							<strong>
								<Briefcase className="icon-title" aria-hidden="true" />
								Corporate Sponsorship
							</strong>
							<p>Employer-funded training programs available</p>
						</div>
					</div>
					<p style={{ marginTop: '1.5rem' }}>
						<strong>Contact our admissions office for detailed tuition information and financial aid applications.</strong>
					</p>
				</article>
			</div>

		</section>
	)
}

export default AdmissionsPage
