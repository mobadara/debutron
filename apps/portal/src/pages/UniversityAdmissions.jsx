function UniversityAdmissions() {
	return (
		<div className="max-w-5xl mx-auto p-8">
			<h1 className="font-serif text-3xl font-bold text-slate-900 mb-4">University Admissions Hub</h1>

			<section className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<article className="bg-white border border-slate-200 shadow-sm p-6">
					<h2 className="text-xl font-bold text-slate-900 mb-2">Current Post-UTME Forms</h2>
					<p className="text-slate-600">Track live Post-UTME and Direct Entry forms, deadlines, and next actions.</p>
				</article>

				<article className="bg-white border border-slate-200 shadow-sm p-6">
					<h2 className="text-xl font-bold text-slate-900 mb-2">CGPA Calculator Guide</h2>
					<p className="text-slate-600">Understand grade points and learn how to project and improve your CGPA early.</p>
				</article>
			</section>
		</div>
	)
}

export default UniversityAdmissions
