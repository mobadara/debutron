function CareerGraduation() {
	return (
		<div className="max-w-5xl mx-auto p-8">
			<h1 className="font-serif text-3xl font-bold text-slate-900 mb-4">Career Hub &amp; Graduation</h1>

			<section className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<article className="bg-white border border-slate-200 shadow-sm p-6">
					<h2 className="text-xl font-bold text-slate-900 mb-2">Resume Builder</h2>
					<p className="text-slate-600">Build a professional, ATS-friendly resume tailored for tech internships and entry-level roles.</p>
				</article>

				<article className="bg-white border border-slate-200 shadow-sm p-6">
					<h2 className="text-xl font-bold text-slate-900 mb-2">Open Tech Internships</h2>
					<p className="text-slate-600">Discover current internship openings and application windows across top tech companies.</p>
				</article>
			</section>
		</div>
	)
}

export default CareerGraduation
