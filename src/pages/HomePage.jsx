import { Link } from 'react-router-dom'
import HeroCarousel from '../components/home/HeroCarousel'
import LatestNews from '../components/home/LatestNews'
import UpcomingEvents from '../components/home/UpcomingEvents'

function HomePage() {
	return (
		<div className="home-page bg-debutron-gray">
			<HeroCarousel />

			<section className="bg-debutron-navy px-6 py-5 text-debutron-white md:px-12">
				<div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 md:flex-row md:items-center">
					<div>
						<p className="font-serif text-xl">Next Academic &amp; Tech Cohort Begins March 2026</p>
						<p className="mt-1 font-sans text-sm text-white/85">
							Secure your place in our admission cycle for exam mastery, data, software, and cloud pathways.
						</p>
					</div>
					<Link
						to="/admissions"
						className="rounded border border-debutron-white bg-debutron-white px-6 py-3 font-sans text-sm font-semibold text-debutron-navy transition hover:bg-transparent hover:text-debutron-white"
					>
						Apply Now
					</Link>
				</div>
			</section>

			<div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-[2fr_1fr] md:px-12">
				<LatestNews />
				<aside>
					<UpcomingEvents />
				</aside>
			</div>

			<section className="bg-white px-6 py-16 md:px-12">
				<div className="mx-auto max-w-7xl rounded border border-slate-200 bg-debutron-white p-8 md:p-12">
					<p className="font-sans text-xs uppercase tracking-[0.18em] text-debutron-charcoal/70">Who We Are</p>
					<h2 className="mt-2 font-serif text-3xl text-debutron-navy md:text-4xl">Vision, Mission &amp; Core Values</h2>
					<p className="mt-4 max-w-4xl font-sans text-base leading-relaxed text-debutron-charcoal">
						Debutron Lab stands at the intersection of academic distinction and applied technology training. We are committed to developing learners who excel in examinations, thrive in modern digital careers, and lead with responsibility in their communities.
					</p>

					<div className="mt-8 grid gap-6 md:grid-cols-3">
						<article className="rounded border border-slate-100 bg-slate-50 p-6">
							<h3 className="font-serif text-2xl text-debutron-navy">Vision</h3>
							<p className="mt-3 font-sans text-sm leading-relaxed text-debutron-charcoal">
								To become a premier African learning hub where classical academic rigor and future-ready technology skills shape transformative leaders.
							</p>
						</article>

						<article className="rounded border border-slate-100 bg-slate-50 p-6">
							<h3 className="font-serif text-2xl text-debutron-navy">Mission</h3>
							<p className="mt-3 font-sans text-sm leading-relaxed text-debutron-charcoal">
								To deliver high-impact academic coaching, structured admissions support, and practical technology programs that produce measurable learner outcomes.
							</p>
						</article>

						<article className="rounded border border-slate-100 bg-slate-50 p-6">
							<h3 className="font-serif text-2xl text-debutron-navy">Core Values</h3>
							<ul className="mt-3 space-y-2 font-sans text-sm text-debutron-charcoal">
								<li><span className="font-semibold text-debutron-navy">Excellence:</span> Consistent quality in teaching and delivery.</li>
								<li><span className="font-semibold text-debutron-navy">Integrity:</span> Ethical guidance and transparent systems.</li>
								<li><span className="font-semibold text-debutron-navy">Innovation:</span> Practical, modern, and industry-relevant methods.</li>
								<li><span className="font-semibold text-debutron-navy">Inclusion:</span> Accessible opportunities for diverse learners.</li>
							</ul>
						</article>
					</div>
				</div>
			</section>

			<section className="bg-gray-50 px-6 py-14 md:px-12">
				<div className="mx-auto max-w-7xl">
					<article className="rounded border border-slate-200 bg-debutron-white p-8 shadow-sm md:p-10">
						<p className="font-sans text-xs uppercase tracking-[0.18em] text-debutron-charcoal/70">Applied Innovation</p>
						<h2 className="mt-2 font-serif text-3xl text-debutron-navy md:text-4xl">Student App Showcase</h2>
						<p className="mt-4 max-w-3xl font-sans text-base leading-relaxed text-debutron-charcoal">
							See how our tech-track students translate classroom learning into real-world products, from full-stack applications to practical AI-powered solutions.
						</p>
						<Link
							to="/student-showcase"
							className="mt-6 inline-block rounded border border-debutron-navy bg-debutron-navy px-6 py-3 font-sans text-sm font-semibold text-white transition hover:bg-transparent hover:text-debutron-navy"
						>
							Explore Student Projects
						</Link>
					</article>
				</div>
			</section>
		</div>
	)
}

export default HomePage
