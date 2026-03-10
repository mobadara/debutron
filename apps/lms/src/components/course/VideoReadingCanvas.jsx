function VideoReadingCanvas() {
	return (
		<section className="w-full max-w-5xl mx-auto flex flex-col gap-6">
			<div className="w-full aspect-video bg-slate-900 dark:bg-black rounded-xl shadow-lg relative overflow-hidden flex items-center justify-center group cursor-pointer">
				<div className="h-20 w-20 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
					<span className="ml-1 text-3xl text-white">▶</span>
				</div>
				<span className="absolute bottom-3 right-3 rounded-md bg-black/75 px-2.5 py-1 text-xs font-semibold text-white">
					14:20
				</span>
			</div>

			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-4 border-b border-slate-200 dark:border-slate-800">
				<div className="flex flex-wrap items-center gap-3">
					<button
						type="button"
						className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
					>
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
							<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
							<polyline points="7 10 12 15 17 10" />
							<line x1="12" y1="15" x2="12" y2="3" />
						</svg>
						Download Resources
					</button>

					<button
						type="button"
						className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-800 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-slate-100"
					>
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
							<path d="M4 4h16v16H4z" />
							<path d="M8 9h8" />
							<path d="M8 13h8" />
							<path d="M8 17h5" />
						</svg>
						Audio Transcript
					</button>
				</div>

				<button
					type="button"
					className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition-colors"
				>
					Mark as Complete &amp; Continue
				</button>
			</div>

			<article className="prose prose-slate dark:prose-invert max-w-none mt-8 pb-16">
				<h2>Understanding the Core Concepts</h2>
				<p>
					This module introduces the foundational ideas that power the rest of the course. Focus on how each concept connects to
					practical outcomes and how the workflow evolves from theory to implementation.
				</p>
				<p>
					As you review the material, compare the examples with real scenarios you have seen before. That reflection will make the
					graded quiz easier and improve your confidence during applied tasks.
				</p>
				<blockquote>
					Strong learners do not just memorize steps; they understand why each step exists and when to adapt it.
				</blockquote>
				<ul>
					<li>Identify the key principle behind each method before applying it.</li>
					<li>Use structured practice to reinforce both speed and accuracy.</li>
					<li>Review mistakes intentionally to build long-term retention.</li>
				</ul>
			</article>
		</section>
	)
}

export default VideoReadingCanvas
