import { normalizeLinkItems, toSlug, withContentFields } from '../utils/normalize'

const toAbsoluteUrl = (value, fallback) => {
	const base = (value || fallback || '').trim()
	if (!base) {
		return ''
	}

	if (/^https?:\/\//i.test(base)) {
		return base.replace(/\/$/, '')
	}

	return `https://${base.replace(/\/$/, '')}`
}

const portalBaseUrl = toAbsoluteUrl(import.meta.env.VITE_PORTAL_URL, 'http://localhost:5175')
const staffBaseUrl = toAbsoluteUrl(import.meta.env.VITE_STAFF_URL, 'http://localhost:5174')

export const carouselSlides = [
	{
		id: 'hero-1',
		headline: 'Educational Consulting for Better Learning Outcomes',
		body: 'We support schools, families, and learners with practical guidance on academic pathways, performance improvement, and long-term career planning.',
		ctaPrimary: 'Explore Programs',
		ctaPrimaryLink: '/programs',
		ctaSecondary: 'Book Consultation',
		ctaSecondaryLink: '/educational-consulting',
		image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1920&auto=format&fit=crop',
	},
	{
		id: 'hero-2',
		headline: 'Digital Career Accelerator for the Modern Workforce',
		body: 'Build in-demand digital skills through hands-on tracks in software engineering, cyber security, data analysis, and cloud computing.',
		ctaPrimary: 'ICT Programs',
		ctaPrimaryLink: '/programs/ict',
		ctaSecondary: 'Request Info',
		ctaSecondaryLink: '/contact',
		image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1920&auto=format&fit=crop',
	},
	{
		id: 'hero-3',
		headline: 'Exam Mastery Academy That Raises Performance',
		body: 'Our focused WASSCE, NECO, GCE, and UTME coaching combines mock exams, targeted revision, and mentoring for stronger results.',
		ctaPrimary: 'Apply Now',
		ctaPrimaryLink: '/admissions',
		ctaSecondary: 'See Admissions',
		ctaSecondaryLink: '/admissions',
		image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1920&auto=format&fit=crop',
	},
	{
		id: 'hero-4',
		headline: 'Exam Registration and Testing Services in One Place',
		body: 'From guided WASSCE/NECO registration to secure testing-center operations, we help candidates and institutions run smoother exam journeys.',
		ctaPrimary: 'View Services',
		ctaPrimaryLink: '/services',
		ctaSecondary: 'Contact Team',
		ctaSecondaryLink: '/contact',
		image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1920&auto=format&fit=crop',
	},
].map((slide, index) => ({
	...withContentFields(slide, { id: `hero-${index + 1}` }),
	kind: 'carousel-slide',
	title: slide.title || slide.headline,
	summary: slide.summary || slide.body,
	description: slide.description || slide.body,
	cta: {
		primary: {
			label: slide.ctaPrimary,
			to: slide.ctaPrimaryLink,
			href: slide.ctaPrimaryLink,
		},
		secondary: {
			label: slide.ctaSecondary,
			to: slide.ctaSecondaryLink,
			href: slide.ctaSecondaryLink,
		},
	},
}))

const personnelDirectory = [
	{
		name: 'Muyiwa J. Obadara',
		team: 'leadership',
		qualifications: 'BSc Physics, Cert. Data Science (Microsoft/Stanford DDRC)',
		title: 'Founder, AI Engineer & Lead Instructor',
		role: 'Founder, AI Engineer & Lead Instructor',
		bio: 'Muyiwa Joseph Obadara is an AI Engineer, a seasoned STEM educator with over five years of classroom experience, and the visionary founder of Debutron Lab. Holding a Bachelor of Science in Physics from the University of Ibadan, alongside advanced credentials in Data Science and Cloud Computing, his expertise bridges the gap between rigorous scientific theory and cutting-edge machine learning. As a professional affected by albinism, Muyiwa is deeply committed to dismantling visual and systemic barriers in education, pioneering inclusive methodologies to ensure brilliance is never hindered by accessibility.',
		image: 'https://source.unsplash.com/featured/?portrait,professional,man',
		orcid: 'https://orcid.org/0000-0002-8891-1207',
		linkedin: 'https://linkedin.com/in/obadara-m',
		github: 'https://github.com/mobadara',
		twitter: 'https://twitter.com/m_obadara',
		email: 'muyi.obadara@debutron.org',
		socials: {
			linkedin: 'https://linkedin.com/in/obadara-m',
			github: 'https://github.com/mobadara',
			twitter: 'https://twitter.com/m_obadara',
			orcid: 'https://orcid.org/0000-0002-8891-1207',
		},
	},
	{
		name: 'Jane Doe',
		team: 'leadership',
		qualifications: 'Ph.D. Education',
		title: 'Head of Studies',
		role: 'Head of Studies',
		bio: 'Jane provides strategic oversight for curriculum design and academic quality across all prep and technology tracks. She emphasizes evidence-based teaching practices that raise learner outcomes while sustaining institutional rigor. Her leadership ensures that every cohort receives structured mentorship and a coherent learning pathway.',
		image: 'https://source.unsplash.com/featured/?portrait,professional,woman,professor',
		linkedin: 'https://linkedin.com/in/jane-doe-edu',
		github: 'https://github.com/janedoeedu',
		twitter: 'https://twitter.com/janedoeedu',
		email: 'jane.doe@debutron.org',
		socials: {
			linkedin: 'https://linkedin.com/in/jane-doe-edu',
			github: 'https://github.com/janedoeedu',
			twitter: 'https://twitter.com/janedoeedu',
			orcid: null,
		},
	},
	{
		name: 'John Smith',
		team: 'leadership',
		qualifications: 'MSc Computer Science',
		title: 'Head of Innovation',
		role: 'Head of Innovation',
		bio: 'John leads the lab’s innovation roadmap across software engineering, cloud systems, and applied AI initiatives. He works closely with instructors to align classroom projects with current industry workflows and tooling. His focus is on building future-ready technical capacity through practical experimentation and measurable outcomes.',
		image: 'https://source.unsplash.com/featured/?portrait,professional,innovation',
		linkedin: 'https://linkedin.com/in/john-smith-innovation',
		github: 'https://github.com/johnsmith-innovation',
		twitter: 'https://twitter.com/jsmith_innovation',
		email: 'john.smith@debutron.org',
		socials: {
			linkedin: 'https://linkedin.com/in/john-smith-innovation',
			github: 'https://github.com/johnsmith-innovation',
			twitter: 'https://twitter.com/jsmith_innovation',
			orcid: null,
		},
	},
	{
		name: 'Dr. CCC',
		team: 'teaching',
		qualifications: 'Ph.D. in Applied Mathematics',
		title: 'Mathematics & Algorithms Instructor',
		role: 'Mathematics & Algorithms Instructor',
		bio: 'Dr. CCC combines rigorous mathematical foundations with practical algorithmic problem-solving in every class session. Her instruction emphasizes conceptual depth, computational clarity, and real assessment readiness. She mentors students to build confidence in both advanced theory and applied digital reasoning.',
		image: 'https://source.unsplash.com/featured/?professor,mathematics',
		linkedin: 'https://linkedin.com/in/dr-ccc-math',
		twitter: 'https://twitter.com/drccc_math',
		email: 'ccc@debutron.org',
		socials: {
			linkedin: 'https://linkedin.com/in/dr-ccc-math',
			github: null,
			twitter: 'https://twitter.com/drccc_math',
			orcid: null,
		},
	},
	{
		name: 'Dr. DDD',
		team: 'teaching',
		qualifications: 'MSc Data Science',
		title: 'Data & AI Instructor',
		role: 'Data & AI Instructor',
		bio: 'Dr. DDD teaches learners to move from data literacy to model-building using structured, ethical workflows. He integrates project-based learning with transparent evaluation rubrics for measurable growth. His sessions connect statistical reasoning to practical AI system design for modern careers.',
		image: 'https://source.unsplash.com/featured/?teacher,technology',
		linkedin: 'https://linkedin.com/in/dr-ddd-ai',
		github: 'https://github.com/drddd-ai',
		twitter: 'https://twitter.com/drddd_ai',
		email: 'ddd@debutron.org',
		socials: {
			linkedin: 'https://linkedin.com/in/dr-ddd-ai',
			github: 'https://github.com/drddd-ai',
			twitter: 'https://twitter.com/drddd_ai',
			orcid: null,
		},
	},
	{
		name: 'Dr. EEE',
		team: 'teaching',
		qualifications: 'M.Ed. Curriculum Studies',
		title: 'Academic Prep Instructor',
		role: 'Academic Prep Instructor',
		bio: 'Dr. EEE specializes in exam-focused pedagogy that strengthens conceptual mastery across core subjects. She combines diagnostic teaching, targeted remediation, and consistent feedback loops for sustainable improvement. Her classes cultivate disciplined study habits and high-performance academic outcomes.',
		image: 'https://source.unsplash.com/featured/?instructor,education',
		linkedin: 'https://linkedin.com/in/dr-eee-curriculum',
		twitter: 'https://twitter.com/dreee_pedagogy',
		email: 'eee@debutron.org',
		socials: {
			linkedin: 'https://linkedin.com/in/dr-eee-curriculum',
			github: null,
			twitter: 'https://twitter.com/dreee_pedagogy',
			orcid: null,
		},
	},
	{
		name: 'Engr. Tayo Ibrahim',
		team: 'leadership',
		qualifications: 'MEng Software Systems',
		title: 'Head, ICT Programs & Innovation',
		role: 'Head, ICT Programs & Innovation',
		bio: 'Tayo coordinates Debutron’s technology curriculum across software engineering, cybersecurity, and cloud pathways, ensuring each program aligns with industry-ready competencies and real project delivery standards.',
		image: 'https://source.unsplash.com/featured/?portrait,engineer,african',
		orcid: 'https://orcid.org/0000-0002-1010-2201',
		linkedin: 'https://linkedin.com/in/tayoibrahim',
		github: 'https://github.com/tayoibrahim-tech',
		twitter: 'https://twitter.com/tayoibrahim',
		email: 'tayo.ibrahim@debutron.org',
		socials: {
			linkedin: 'https://linkedin.com/in/tayoibrahim',
			github: 'https://github.com/tayoibrahim-tech',
			twitter: 'https://twitter.com/tayoibrahim',
			orcid: 'https://orcid.org/0000-0002-1010-2201',
		},
	},
	{
		name: 'Mrs. Miriam Ekanem',
		team: 'leadership',
		qualifications: 'M.Ed Educational Measurement',
		title: 'Head, Academic Advancement Unit',
		role: 'Head, Academic Advancement Unit',
		bio: 'Miriam oversees learner support and exam-preparation strategy, leading interventions that improve outcomes across WASSCE, NECO, and UTME tracks through data-informed coaching systems.',
		image: 'https://source.unsplash.com/featured/?portrait,educator,woman',
		linkedin: 'https://linkedin.com/in/miriamekanem',
		twitter: 'https://twitter.com/miriamekanem',
		email: 'miriam.ekanem@debutron.org',
		socials: {
			linkedin: 'https://linkedin.com/in/miriamekanem',
			github: null,
			twitter: 'https://twitter.com/miriamekanem',
			orcid: null,
		},
	},
	{
		name: 'Dr. Chukwuemeka Okafor',
		team: 'teaching',
		qualifications: 'Ph.D. Computational Statistics',
		title: 'Senior Data Science Instructor',
		role: 'Senior Data Science Instructor',
		bio: 'Chukwuemeka leads advanced analytics and machine-learning modules, mentoring students from exploratory analysis to deployable predictive models and interpretable AI workflows.',
		image: 'https://source.unsplash.com/featured/?portrait,data-scientist',
		orcid: 'https://orcid.org/0000-0002-4400-5500',
		linkedin: 'https://linkedin.com/in/chukwuemekaokafor',
		github: 'https://github.com/chukwuemeka-ds',
		twitter: 'https://twitter.com/chukwuemeka_ds',
		email: 'chukwuemeka.okafor@debutron.org',
		socials: {
			linkedin: 'https://linkedin.com/in/chukwuemekaokafor',
			github: 'https://github.com/chukwuemeka-ds',
			twitter: 'https://twitter.com/chukwuemeka_ds',
			orcid: 'https://orcid.org/0000-0002-4400-5500',
		},
	},
	{
		name: 'Ms. Aisha Bello',
		team: 'teaching',
		qualifications: 'CEH, CompTIA Security+',
		title: 'Cyber Security Lead Trainer',
		role: 'Cyber Security Lead Trainer',
		bio: 'Aisha delivers practical cyber defense training across secure system design, threat modeling, and incident response, with hands-on labs that mirror real enterprise scenarios.',
		image: 'https://source.unsplash.com/featured/?portrait,cybersecurity,trainer',
		linkedin: 'https://linkedin.com/in/aishabello',
		twitter: 'https://twitter.com/aishabello',
		email: 'aisha.bello@debutron.org',
		socials: {
			linkedin: 'https://linkedin.com/in/aishabello',
			github: null,
			twitter: 'https://twitter.com/aishabello',
			orcid: null,
		},
	},
	{
		name: 'Mr. Samuel Adeyemi',
		team: 'teaching',
		qualifications: 'AWS Solutions Architect, Azure Administrator',
		title: 'Cloud Computing Facilitator',
		role: 'Cloud Computing Facilitator',
		bio: 'Samuel teaches cloud architecture and DevOps fundamentals with project-based delivery spanning CI/CD, containerization, and cost-aware deployment on modern cloud platforms.',
		image: 'https://source.unsplash.com/featured/?portrait,cloud,engineer',
		linkedin: 'https://linkedin.com/in/samueladeyemi',
		twitter: 'https://twitter.com/samadeyemi_cloud',
		email: 'samuel.adeyemi@debutron.org',
		socials: {
			linkedin: 'https://linkedin.com/in/samueladeyemi',
			github: null,
			twitter: 'https://twitter.com/samadeyemi_cloud',
			orcid: null,
		},
	},
	{
		name: 'Mrs. Grace Nwankwo',
		team: 'teaching',
		qualifications: 'B.Ed Mathematics',
		title: 'Academic Coach - Mathematics',
		role: 'Academic Coach - Mathematics',
		bio: 'Grace supports foundational and advanced mathematics performance through diagnostic assessments, tailored remediation plans, and regular mastery checks for exam confidence.',
		image: 'https://source.unsplash.com/featured/?portrait,math,teacher',
		linkedin: 'https://linkedin.com/in/gracenwankwo',
		email: 'grace.nwankwo@debutron.org',
		socials: {
			linkedin: 'https://linkedin.com/in/gracenwankwo',
			github: null,
			twitter: null,
			orcid: null,
		},
	},
	{
		name: 'Mr. Oluwaseun Johnson',
		team: 'teaching',
		qualifications: 'BSc Computer Science',
		title: 'Software Engineering Mentor',
		role: 'Software Engineering Mentor',
		bio: 'Oluwaseun mentors full-stack software projects from ideation to deployment, coaching students on modern JavaScript tooling, clean architecture, and collaborative development practices.',
		image: 'https://source.unsplash.com/featured/?portrait,software,developer',
		linkedin: 'https://linkedin.com/in/oluwaseunjohnson',
		github: 'https://github.com/oluwaseunj',
		twitter: 'https://twitter.com/oluwaseunj',
		email: 'oluwaseun.johnson@debutron.org',
		socials: {
			linkedin: 'https://linkedin.com/in/oluwaseunjohnson',
			github: 'https://github.com/oluwaseunj',
			twitter: 'https://twitter.com/oluwaseunj',
			orcid: null,
		},
	},
].map((member, index) => ({
	...member,
	...withContentFields(member, { id: `staff-${index + 1}` }),
	kind: 'staff',
	slug: member.slug || toSlug(member.name),
	name: member.name,
	title: member.title || member.role,
	summary: member.summary || member.bio,
	socials: {
		linkedin: member.socials?.linkedin || member.linkedin || null,
		github: member.socials?.github || member.github || null,
		twitter: member.socials?.twitter || member.twitter || null,
		orcid: member.socials?.orcid || member.orcid || null,
	},
}))

export const leadershipDirectory = personnelDirectory.filter((member) => member.team === 'leadership')

export const staffDirectory = personnelDirectory.filter((member) => member.team !== 'leadership')

export const aboutMenuLinks = normalizeLinkItems([
	{ label: 'Our Story', to: '/about' },
	{ label: 'Vision & Core Values', to: '/who-we-are' },
	{ label: 'Leadership & Teaching Team', to: '/leadership' },
	{ label: 'The Innovation Lab (Facilities)', to: '/innovation-lab' },
	{ label: 'Accreditations & Partnerships', to: '/accreditations-partnerships' },
	{ label: 'Careers', to: '/careers' },
], 'about')

export const innovationsMenuLinks = normalizeLinkItems([
	{ label: 'AI & Data Models', to: '/ai-data-models' },
	{ label: 'Enterprise Consulting', to: '/enterprise-consulting' },
	{ label: 'Student App Showcase', to: '/student-showcase' },
], 'innovations')

export const programsAcademicLinks = normalizeLinkItems([
	{ label: 'O-Level Mastery (WASSCE / NECO / GCE)', to: '/o-level-mastery' },
	{ label: 'A-Level Excellence', to: '/a-level-excellence' },
	{ label: 'UTME Accelerator', to: '/utme-accelerator' },
], 'programs-academic')

export const programsTechLinks = normalizeLinkItems([
	{ label: 'Applied Data Science', to: '/applied-data-science' },
	{ label: 'Data Analytics & Insights', to: '/data-analytics-insights' },
	{ label: 'Cloud Infrastructure & Engineering', to: '/cloud-infrastructure-engineering' },
	{ label: 'Cyber Defense & Security', to: '/cyber-defense-security' },
	{ label: 'Full-Stack Software Engineering', to: '/full-stack-software-engineering' },
], 'programs-tech')

export const assessmentMenuLinks = normalizeLinkItems([
	{ label: 'Pearson VUE Testing Center', to: '/pearson-vue', badge: 'Coming Soon' },
	{ label: 'Educational Consulting', to: '/educational-consulting' },
	{ label: 'Exam Registration (WASSCE / NECO / UTME)', to: '/exam-registration' },
], 'assessment')

export const footerAcademicTechLinks = normalizeLinkItems([
	{ label: 'O-Level Mastery', to: '/o-level-mastery' },
	{ label: 'UTME Accelerator', to: '/utme-accelerator' },
	{ label: 'Applied Data Science', to: '/applied-data-science' },
	{ label: 'Full-Stack Software Engineering', to: '/full-stack-software-engineering' },
], 'footer-academic-tech')

export const footerAssessmentInnovationLinks = normalizeLinkItems([
	{ label: 'Pearson VUE Testing Center', to: '/pearson-vue', badge: 'Coming Soon' },
	{ label: 'Enterprise Consulting', to: '/enterprise-consulting' },
	{ label: 'Educational Consulting', to: '/educational-consulting' },
	{ label: 'Exam Registration (WASSCE / NECO / UTME)', to: '/exam-registration' },
	{ label: 'AI & Data Models', to: '/ai-data-models' },
	{ label: 'Student App Showcase', to: '/student-showcase' },
], 'footer-assessment-innovation')

export const footerContact = {
	id: 'footer-contact',
	type: 'contact',
	description: 'Academic excellence and advanced technology training for future-ready learners.',
	address: 'A6, Jerusalem Crescent, Arulogun Road, Ibadan, OY, Nigeria',
	phoneHref: 'tel:+2348060111429',
	phoneLabel: '+234 (806) 011 1429',
	phone: '+234 (806) 011 1429',
	emailHref: 'mailto:debutronlab@gmail.com',
	emailLabel: 'debutronlab@gmail.com',
	email: 'debutronlab@gmail.com',
	websiteHref: 'https://debutron.org',
	websiteLabel: 'https://debutron.org',
	website: 'https://debutron.org',
}

export const topUtilityData = {
	id: 'top-utility',
	type: 'navigation-meta',
	applyNow: { label: 'Apply Now', to: '/admissions' },
	portals: [
		{ label: 'Student Login', href: `${portalBaseUrl}/login`, newTab: true },
		{ label: 'Staff Login', href: `${staffBaseUrl}/login`, newTab: true },
	],
	staffMail: {
		label: 'Staff Mail',
		href: 'https://outlook.office.com',
	},
}
