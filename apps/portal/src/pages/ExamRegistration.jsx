function ExamRegistration() {
	const advantages = [
		'100% accurate biometric and data capturing.',
		'Immediate integration into our intensive UTME/WASSCE preparatory classes.',
		'Specialized registration support for candidates requiring visual accommodations (Albinism/Low Vision).',
		'Dedicated support desk to resolve portal or profile errors.',
	]

	return (
		<div className="bg-white text-debutron-charcoal">
			<section className="border-b border-gray-200 bg-gray-50 py-16 text-center">
				<div className="mx-auto max-w-4xl px-6">
					<h1 className="font-serif text-4xl font-bold text-debutron-navy">Official Examination Registration</h1>
					<p className="mx-auto mt-4 max-w-2xl font-sans text-lg text-debutron-charcoal">
						Seamless, error-free registration for Nigeria&apos;s core academic examinations, paired with our premier preparatory programs.
					</p>
				</div>
			</section>

			<section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-3">
				<article className="flex flex-col items-center rounded-sm border-t-4 border-debutron-navy bg-white p-8 text-center shadow-md transition-shadow hover:shadow-lg">
					<div className="mb-6 flex h-24 w-full items-center justify-center">
						<img
							src="/images/jamb-logo.jpeg"
							alt="JAMB Logo"
							className="h-full w-auto max-w-[180px] object-contain"
						/>
					</div>
					<h2 className="mb-3 font-serif text-2xl font-bold text-debutron-navy">JAMB / UTME</h2>
					<p className="font-sans text-gray-700">
						Complete your JAMB registration with zero administrative hassle. We ensure profile creation and center selection are handled accurately.
					</p>
				</article>

				<article className="flex flex-col items-center rounded-sm border-t-4 border-debutron-navy bg-white p-8 text-center shadow-md transition-shadow hover:shadow-lg">
					<div className="mb-6 flex h-24 w-full items-center justify-center">
						<img
							src="/images/waec-logo.png"
							alt="WAEC Logo"
							className="h-full w-auto max-w-[180px] object-contain"
						/>
					</div>
					<h2 className="mb-3 font-serif text-2xl font-bold text-debutron-navy">WASSCE</h2>
					<p className="font-sans text-gray-700">
						Secure your spot for the West African Senior School Certificate Examination. Ideal for our O-Level Mastery and Inclusive Prep students.
					</p>
				</article>

				<article className="flex flex-col items-center rounded-sm border-t-4 border-debutron-navy bg-white p-8 text-center shadow-md transition-shadow hover:shadow-lg">
					<div className="mb-6 flex h-24 w-full items-center justify-center">
						<img
							src="/images/neco-logo.jpeg"
							alt="NECO Logo"
							className="h-full w-auto max-w-[180px] object-contain"
						/>
					</div>
					<h2 className="mb-3 font-serif text-2xl font-bold text-debutron-navy">NECO / GCE</h2>
					<p className="font-sans text-gray-700">
						Reliable registration services for the National Examinations Council and General Certificate of Education exams.
					</p>
				</article>
			</section>

			<section className="mt-8 bg-debutron-navy px-6 py-16 text-white">
				<div className="mx-auto max-w-4xl">
					<h2 className="mb-8 border-b border-gray-600 pb-4 font-serif text-3xl">Why Register With Us?</h2>
					<ul className="space-y-4">
						{advantages.map((item) => (
							<li key={item} className="flex items-start gap-3 font-sans text-lg text-gray-200">
								<span aria-hidden="true">✓</span>
								<span>{item}</span>
							</li>
						))}
					</ul>
				</div>
			</section>
		</div>
	)
}

export default ExamRegistration
