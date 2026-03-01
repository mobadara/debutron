import { Link } from 'react-router-dom'

function EduConsulting() {
	return (
		<div className="bg-white text-debutron-charcoal">
			<section
				className="relative bg-cover bg-center px-6 py-24"
				style={{ backgroundImage: "url('https://source.unsplash.com/featured/?mentor,student,library')" }}
			>
				<div className="absolute inset-0 bg-black/60" aria-hidden="true" />
				<div className="relative mx-auto max-w-6xl">
					<h1 className="mb-4 max-w-4xl font-serif text-4xl font-bold text-white md:text-5xl">
						Strategic Academic &amp; Career Guidance
					</h1>
					<p className="max-w-2xl font-sans text-xl text-gray-100">
						Expert consulting to navigate university admissions, tech career pathways, and inclusive education planning.
					</p>
				</div>
			</section>

			<section className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-3">
				<article className="border-t-4 border-debutron-navy bg-white p-8 shadow-md">
					<h2 className="mb-4 font-serif text-2xl text-debutron-navy">University Admissions</h2>
					<p className="font-sans leading-relaxed text-gray-700">
						Comprehensive guidance for UTME/WASSCE candidates targeting top-tier universities. We analyze academic strengths, assist with course selection, and map out a precise admission strategy.
					</p>
				</article>

				<article className="border-t-4 border-debutron-navy bg-white p-8 shadow-md">
					<h2 className="mb-4 font-serif text-2xl text-debutron-navy">Tech Career Pathing</h2>
					<p className="font-sans leading-relaxed text-gray-700">
						Transitioning into tech? Our AI engineers and industry professionals provide 1-on-1 mentorship to help you choose the right tech track—whether it&apos;s Data Science, Cloud Infrastructure, or Software Engineering.
					</p>
				</article>

				<article className="border-t-4 border-debutron-navy bg-white p-8 shadow-md">
					<h2 className="mb-4 font-serif text-2xl text-debutron-navy">Inclusive Education Planning</h2>
					<p className="font-sans leading-relaxed text-gray-700">
						Specialized advisory for students with albinism and visual impairments. We help families navigate academic accommodations, digital aids, and long-term educational success strategies.
					</p>
				</article>
			</section>

			<section className="border-t border-gray-200 bg-gray-50 px-6 py-16 text-center">
				<div className="mx-auto max-w-4xl">
					<h2 className="mb-4 font-serif text-3xl text-debutron-navy">Schedule a Consultation</h2>
					<p className="mb-8 font-sans text-gray-700">
						Speak directly with our Lead Instructor or Head of Studies.
					</p>
					<Link
						to="/educational-consulting/book-consultation"
						className="inline-block rounded-sm bg-debutron-navy px-8 py-3 font-sans font-bold text-white transition-colors hover:bg-debutron-charcoal"
					>
						Book an Appointment
					</Link>
				</div>
			</section>
		</div>
	)
}

export default EduConsulting
