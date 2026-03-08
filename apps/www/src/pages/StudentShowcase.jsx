function ProjectCard({ project }) {
	return (
		<article className="overflow-hidden rounded-sm border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-lg">
			<img
				src="https://source.unsplash.com/featured/?software,app,dashboard"
				alt="Student project interface placeholder"
				className="h-48 w-full object-cover"
			/>
			<div className="p-6">
				<h2 className="font-serif text-xl font-bold text-debutron-navy">{project.title}</h2>
				<span className="mb-3 mt-2 block font-sans text-xs uppercase tracking-wide text-gray-500">
					By John Doe | Full-Stack Software Engineering
				</span>
				<p className="mb-4 font-sans text-sm text-gray-700">
					{project.description}
				</p>
				<div className="mb-4 flex flex-wrap gap-2">
					{project.techStack.map((tech) => (
						<span
							key={tech}
							className="rounded-sm bg-debutron-gray px-2 py-1 text-xs text-debutron-navy"
						>
							{tech}
						</span>
					))}
				</div>
				<a href="#" className="font-sans text-sm font-semibold text-debutron-navy hover:underline">
					View Project
				</a>
			</div>
		</article>
	)
}

function StudentShowcase() {
	const placeholderProject = {
		title: 'Enterprise Insight Dashboard',
		description:
			'A full-stack analytics platform that visualizes sales and customer behavior in real time. It helps teams monitor KPIs and forecast performance with actionable insights.',
		techStack: ['React', 'Python', 'TensorFlow'],
	}

	const projects = [placeholderProject, placeholderProject, placeholderProject]

	return (
		<div className="bg-white text-debutron-charcoal">
			<section className="border-b border-gray-200 bg-gray-50 px-6 py-20 text-center">
				<div className="mx-auto max-w-5xl">
					<h1 className="mb-4 font-serif text-4xl font-bold text-debutron-navy">
						The Next Generation of Digital Creators
					</h1>
					<p className="mx-auto max-w-3xl font-sans text-lg text-debutron-charcoal">
						Explore the capstone projects, full-stack applications, and predictive models engineered by Debutron Lab graduates.
					</p>
				</div>
			</section>

			<section className="mx-auto max-w-7xl px-6 py-16">
				<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
					{projects.map((project, index) => (
						<ProjectCard key={`${project.title}-${index}`} project={project} />
					))}
				</div>
			</section>

			<section className="bg-debutron-navy px-6 py-12 text-center text-white">
				<p className="mx-auto max-w-4xl font-serif text-xl md:text-2xl">
					Every tech track student at Debutron Lab is required to build, publish, and defend a real-world digital product before receiving their academic transcript and certification.
				</p>
			</section>
		</div>
	)
}

export default StudentShowcase
