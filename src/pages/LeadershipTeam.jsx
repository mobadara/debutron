import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { SiOrcid } from 'react-icons/si'

function LeadershipTeam() {
	const leadershipMembers = [
		{
			name: 'Muyiwa J. Obadara',
			qualifications: 'BSc Physics, Cert. Data Science (Microsoft/Stanford DDRC)',
			title: 'Founder, AI Engineer & Lead Instructor',
			bio: 'Muyiwa Joseph Obadara is an AI Engineer, a seasoned STEM educator with over five years of classroom experience, and the visionary founder of Debutron Lab. Holding a Bachelor of Science in Physics from the University of Ibadan, alongside advanced credentials in Data Science and Cloud Computing, his expertise bridges the gap between rigorous scientific theory and cutting-edge machine learning. As a professional affected by albinism, Muyiwa is deeply committed to dismantling visual and systemic barriers in education, pioneering inclusive methodologies to ensure brilliance is never hindered by accessibility.',
			image: 'https://source.unsplash.com/featured/?portrait,professional,man',
			socials: {
				linkedin: 'https://linkedin.com/in/obadara-m',
				github: 'https://github.com/mobadara',
				twitter: 'https://twitter.com/m_obadara',
				orcid: '#'
			}
		},
		{
			name: 'Jane Doe',
			qualifications: 'Ph.D. Education',
			title: 'Head of Studies',
			bio: 'Jane provides strategic oversight for curriculum design and academic quality across all prep and technology tracks. She emphasizes evidence-based teaching practices that raise learner outcomes while sustaining institutional rigor. Her leadership ensures that every cohort receives structured mentorship and a coherent learning pathway.',
			image: 'https://source.unsplash.com/featured/?portrait,professional,woman,professor',
			socials: {
				linkedin: '#',
				github: '#',
				twitter: '#',
				orcid: '#'
			}
		},
		{
			name: 'John Smith',
			qualifications: 'MSc Computer Science',
			title: 'Head of Innovation',
			bio: 'John leads the lab’s innovation roadmap across software engineering, cloud systems, and applied AI initiatives. He works closely with instructors to align classroom projects with current industry workflows and tooling. His focus is on building future-ready technical capacity through practical experimentation and measurable outcomes.',
			image: 'https://source.unsplash.com/featured/?portrait,professional,innovation',
			socials: {
				linkedin: '#',
				github: '#',
				twitter: '#',
				orcid: '#'
			}
		}
	]

	const teachingMembers = [
		{
			name: 'Dr. CCC',
			qualifications: 'Ph.D. in Applied Mathematics',
			title: 'Mathematics & Algorithms Instructor',
			bio: 'Dr. CCC combines rigorous mathematical foundations with practical algorithmic problem-solving in every class session. Her instruction emphasizes conceptual depth, computational clarity, and real assessment readiness. She mentors students to build confidence in both advanced theory and applied digital reasoning.',
			image: 'https://source.unsplash.com/featured/?professor,mathematics'
		},
		{
			name: 'Dr. DDD',
			qualifications: 'MSc Data Science',
			title: 'Data & AI Instructor',
			bio: 'Dr. DDD teaches learners to move from data literacy to model-building using structured, ethical workflows. He integrates project-based learning with transparent evaluation rubrics for measurable growth. His sessions connect statistical reasoning to practical AI system design for modern careers.',
			image: 'https://source.unsplash.com/featured/?teacher,technology'
		},
		{
			name: 'Dr. EEE',
			qualifications: 'M.Ed. Curriculum Studies',
			title: 'Academic Prep Instructor',
			bio: 'Dr. EEE specializes in exam-focused pedagogy that strengthens conceptual mastery across core subjects. She combines diagnostic teaching, targeted remediation, and consistent feedback loops for sustainable improvement. Her classes cultivate disciplined study habits and high-performance academic outcomes.',
			image: 'https://source.unsplash.com/featured/?instructor,education'
		}
	]

	return (
		<section className="route-page bg-gray-100">
			<div className="mx-auto max-w-7xl px-6 pb-16 md:px-12">
				<h1 className="mt-12 mb-4 text-center font-serif text-4xl font-bold text-debutron-navy">Leadership &amp; Teaching Team</h1>
				<p className="mx-auto mb-16 max-w-2xl text-center font-sans text-lg text-debutron-charcoal">
					Meet the visionary educators, AI engineers, and industry experts guiding the next generation of digital leaders.
				</p>

				<h2 className="mx-auto mb-8 max-w-6xl border-b-2 border-gray-200 pb-2 font-serif text-3xl font-bold text-debutron-navy">Leadership</h2>

				{leadershipMembers.map((member) => (
					<article key={member.name} className="mx-auto mb-8 flex max-w-6xl flex-col items-start gap-8 rounded-sm border border-gray-100 bg-white p-8 shadow-sm md:flex-row">
						<img
							src={member.image}
							alt={member.name}
							className="h-48 w-48 flex-shrink-0 border-2 border-gray-200 object-cover shadow-sm md:h-56 md:w-56"
						/>
						<div>
							<h3 className="font-serif text-2xl font-bold text-debutron-navy">{member.name}</h3>
							<p className="mb-1 font-sans text-sm italic text-gray-500">{member.qualifications}</p>
							<p className="mb-4 font-sans text-sm font-semibold uppercase tracking-widest text-debutron-charcoal">{member.title}</p>
							<p className="mb-6 font-sans text-base leading-relaxed text-gray-700">{member.bio}</p>
							<div className="flex items-center gap-4 text-xl text-gray-400">
								<a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} LinkedIn`} className="inline-flex transition-colors hover:text-[#0A66C2]"><FaLinkedin /></a>
								<a href={member.socials.github} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} GitHub`} className="inline-flex transition-colors hover:text-black"><FaGithub /></a>
								<a href={member.socials.twitter} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} Twitter`} className="inline-flex transition-colors hover:text-black"><FaTwitter /></a>
								<a href={member.socials.orcid} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} ORCID`} className="inline-flex transition-colors hover:text-[#A6CE39]"><SiOrcid /></a>
							</div>
						</div>
					</article>
				))}

				<h2 className="mx-auto mt-16 mb-8 max-w-6xl border-b-2 border-gray-200 pb-2 font-serif text-3xl font-bold text-debutron-navy">Teaching Team</h2>

				<section className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
					{teachingMembers.map((member) => (
						<article key={member.name} className="flex flex-col rounded-sm border border-gray-200 bg-gray-50 p-6 text-left shadow-sm">
							<img src={member.image} alt={member.name} className="mb-4 h-24 w-24 rounded-full border-2 border-gray-200 object-cover" />
							<h3 className="font-serif text-xl font-bold text-debutron-navy">{member.name}</h3>
							<p className="mb-1 font-sans text-sm italic text-gray-500">{member.qualifications}</p>
							<p className="mb-3 font-sans text-xs font-semibold uppercase tracking-wider text-debutron-charcoal">{member.title}</p>
							<p className="mb-6 flex-grow font-sans text-sm leading-relaxed text-gray-700">{member.bio}</p>
							<div className="flex items-center gap-3 text-lg text-gray-400">
								<a href="#" aria-label={`${member.name} LinkedIn`} className="inline-flex transition-colors hover:text-[#0A66C2]"><FaLinkedin /></a>
								<a href="#" aria-label={`${member.name} Twitter`} className="inline-flex transition-colors hover:text-black"><FaTwitter /></a>
								<a href="#" aria-label={`${member.name} GitHub`} className="inline-flex transition-colors hover:text-black"><FaGithub /></a>
								<a href="#" aria-label={`${member.name} ORCID`} className="inline-flex transition-colors hover:text-[#A6CE39]"><SiOrcid /></a>
							</div>
						</article>
					))}
				</section>
			</div>
		</section>
	)
}

export default LeadershipTeam
