export const TRACKS = [
	{ id: 'tech', label: 'Innovation Lab' },
	{ id: 'academic', label: 'Pre-University Studies' },
]

export const TRACK_LABELS = TRACKS.reduce((accumulator, track) => {
	accumulator[track.id] = track.label
	return accumulator
}, {})

export const PROGRAMS_BY_TRACK = {
	tech: [
		{ id: 'p1', name: 'Data Science & AI' },
		{ id: 'p2', name: 'Full-Stack Engineering' },
	],
	academic: [
		{ id: 'p3', name: 'A-Levels (Science)' },
		{ id: 'p4', name: 'UTME Intensive' },
	],
}

const BASE_LESSONS = [
	{
		id: 'lesson-1',
		title: 'Lesson 1: Vectors and Kinematics',
		dates: 'Oct 12 - Oct 26',
		availableFrom: '2025-10-12T00:00:00Z',
		items: [
			{
				id: 'item-video-intro-vectors',
				type: 'video',
				title: 'Video: Introduction to Vector Spaces',
				duration: '45 mins',
				locked: false,
				content: {
					id: 'content-video-intro-vectors',
					videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
					description:
						'In this lecture, students are introduced to vector spaces and how direction-based quantities differ from scalar values.',
					captionTracks: [
						{ srclang: 'en', label: 'English', src: '/captions/vectors-en.vtt', default: true },
						{ srclang: 'es', label: 'Español', src: '/captions/vectors-es.vtt' },
						{ srclang: 'fr', label: 'Français', src: '/captions/vectors-fr.vtt' },
						{ srclang: 'ar', label: 'العربية', src: '/captions/vectors-ar.vtt' },
					],
				},
			},
			{
				id: 'item-reading-core-principles',
				type: 'reading',
				title: 'Reading: Chapter 1 & 2',
				duration: '1 hour',
				locked: false,
				content: {
					id: 'content-reading-core-principles',
					markdown:
						'## 1.1 The Nature of Vectors\n\nUnlike scalars which only possess magnitude, vectors possess both magnitude and direction.\n\n$$ \\vec{v} = v_x\\hat{i} + v_y\\hat{j} + v_z\\hat{k} $$\n\nWhen adding two vectors, combine their respective components and interpret the geometric result physically.',
				},
			},
			{
				id: 'item-discussion-scalars',
				type: 'discussion',
				title: 'Discussion: Real-world Applications of Scalars',
				duration: 'Required',
				locked: false,
				content: {
					id: 'content-discussion-scalars',
					description: 'Share two real-world contexts where scalar-only models are insufficient.',
				},
			},
			{
				id: 'item-practice-vector-addition',
				type: 'practice',
				title: 'Practice Quiz: Vector Addition',
				duration: '10 Questions',
				locked: false,
				content: {
					id: 'content-practice-vector-addition',
					description: 'Unproctored readiness quiz covering vector components and resolution.',
					quizData: {
						title: 'Practice Quiz: Vector Addition',
						description:
							'Test your understanding of vector components, displacement, and basic kinematics in a low-stakes practice environment.',
						durationInSeconds: 480,
						isProctored: false,
						questions: [
							{
								id: 'practice-vectors-q1',
								type: 'mcq',
								points: 10,
								text: 'A student walks 6 m east and 8 m north. What is the magnitude of the displacement?',
								options: ['10 m', '14 m', '2 m', '48 m'],
								correctAnswer: '10 m',
							},
							{
								id: 'practice-vectors-q2',
								type: 'mcq',
								points: 10,
								text: 'Which statement best describes a vector quantity?',
								options: [
									'It has magnitude only',
									'It has direction only',
									'It has both magnitude and direction',
									'It is always constant',
								],
								correctAnswer: 'It has both magnitude and direction',
							},
							{
								id: 'practice-vectors-q3',
								type: 'short-answer',
								points: 10,
								text: 'Explain why vector components are useful when solving real-world motion problems.',
							},
						],
					},
				},
			},
			{
				id: 'item-notes-sandbox',
				type: 'notes',
				title: 'Personal Notes Sandbox',
				duration: 'Private',
				locked: false,
				content: {
					id: 'content-notes-sandbox',
					description: 'Capture private notes while studying this lesson.',
				},
			},
			{
				id: 'item-graded-kinematics',
				type: 'graded',
				title: 'Graded Quiz: Kinematics Assessment',
				duration: '30 mins',
				locked: false,
				content: {
					id: 'content-graded-kinematics',
					description: 'Timed graded assessment for lesson mastery.',
					quizData: {
						title: 'Graded Quiz: Kinematics Assessment',
						description:
							'This assessment covers vector addition, velocity, and acceleration. You have 10 minutes to complete it. Once you begin, do not leave this tab.',
						durationInSeconds: 600,
						isProctored: true,
						questions: [
							{
								id: 'kinematics-q1',
								type: 'mcq',
								points: 10,
								text: 'If a car travels 40 km east and then 30 km north, what is the magnitude of its displacement from the origin?',
								options: ['10 km', '50 km', '70 km', '120 km'],
								correctAnswer: '50 km',
							},
							{
								id: 'kinematics-q2',
								type: 'mcq',
								points: 10,
								text: 'Which of the following is a scalar quantity?',
								options: ['Force', 'Velocity', 'Temperature', 'Acceleration'],
								correctAnswer: 'Temperature',
							},
							{
								id: 'kinematics-q3',
								type: 'short-answer',
								points: 20,
								text: 'Briefly explain the difference between average speed and average velocity.',
							},
						],
					},
				},
			},
			{
				id: 'item-assignment-projectile',
				type: 'assignment',
				title: 'Written Assignment: Projectile Motion Lab',
				duration: 'Due Oct 26',
				locked: false,
				content: {
					id: 'content-assignment-projectile',
					description: 'Submit a short report with plots and interpretation.',
				},
			},
			{
				id: 'item-resources-datasets',
				type: 'resources',
				title: 'Additional Resources & Datasets',
				duration: 'Optional',
				locked: false,
				content: {
					id: 'content-resources-datasets',
					description: 'Supplementary resources and dataset links for deeper learning.',
				},
			},
		],
	},
	{
		id: 'lesson-2',
		title: "Lesson 2: Newton's Laws of Motion",
		dates: 'Oct 27 - Nov 14',
		availableFrom: '2025-10-27T00:00:00Z',
		items: [
			{
				id: 'item-video-inertia',
				type: 'video',
				title: 'Video: Inertia and Mass',
				duration: '50 mins',
				locked: false,
				content: {
					id: 'content-video-inertia',
					videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
					description: 'Overview of mass, inertia, and dynamic systems under external force.',
					captionTracks: [
						{ srclang: 'en', label: 'English', src: '/captions/inertia-en.vtt', default: true },
						{ srclang: 'es', label: 'Español', src: '/captions/inertia-es.vtt' },
						{ srclang: 'fr', label: 'Français', src: '/captions/inertia-fr.vtt' },
						{ srclang: 'ar', label: 'العربية', src: '/captions/inertia-ar.vtt' },
					],
				},
			},
			{
				id: 'item-practice-fbd',
				type: 'practice',
				title: 'Practice Quiz: Free Body Diagrams',
				duration: '15 Questions',
				locked: false,
				content: {
					id: 'content-practice-fbd',
					description: 'Practice force decomposition and sign convention.',
					quizData: {
						title: 'Practice Quiz: Free Body Diagrams',
						description:
							'Practice identifying forces, directions, and resultant motion before the graded dynamics assessment unlocks.',
						durationInSeconds: 540,
						isProctored: false,
						questions: [
							{
								id: 'dynamics-practice-q1',
								type: 'mcq',
								points: 10,
								text: 'A box resting on a floor has which pair of vertical forces acting on it?',
								options: ['Applied force and friction', 'Weight and normal reaction', 'Tension and drag', 'Velocity and acceleration'],
								correctAnswer: 'Weight and normal reaction',
							},
							{
								id: 'dynamics-practice-q2',
								type: 'mcq',
								points: 10,
								text: 'Which force usually opposes motion between two rough surfaces?',
								options: ['Friction', 'Tension', 'Normal force', 'Weight'],
								correctAnswer: 'Friction',
							},
							{
								id: 'dynamics-practice-q3',
								type: 'short-answer',
								points: 10,
								text: 'Describe how you would begin drawing a free body diagram for an object on an inclined plane.',
							},
						],
					},
				},
			},
			{
				id: 'item-graded-dynamics',
				type: 'graded',
				title: 'Graded Quiz: Dynamics',
				duration: '45 mins',
				locked: false,
				unlockAfter: ['item-practice-fbd'],
				content: {
					id: 'content-graded-dynamics',
					description: 'Comprehensive graded quiz unlocked after practice completion.',
					quizData: {
						title: 'Graded Quiz: Dynamics',
						description:
							'This timed dynamics assessment unlocks after the practice quiz and includes proctoring safeguards.',
						durationInSeconds: 900,
						isProctored: true,
						questions: [
							{
								id: 'dynamics-graded-q1',
								type: 'mcq',
								points: 10,
								text: 'According to Newton\'s second law, if net force doubles while mass stays constant, acceleration will:',
								options: ['Halve', 'Double', 'Remain unchanged', 'Become zero'],
								correctAnswer: 'Double',
							},
							{
								id: 'dynamics-graded-q2',
								type: 'mcq',
								points: 10,
								text: 'What is the net force on an object moving at constant velocity in a straight line?',
								options: ['Equal to its mass', 'Equal to its weight', 'Zero', 'Increasing'],
								correctAnswer: 'Zero',
							},
							{
								id: 'dynamics-graded-q3',
								type: 'short-answer',
								points: 20,
								text: 'Explain how Newton\'s third law applies when a swimmer pushes water backward to move forward.',
							},
						],
					},
				},
			},
		],
	},
	{
		id: 'lesson-3',
		title: 'Lesson 3: Energy, Work & Power',
		dates: 'Nov 15 - Nov 30',
		availableFrom: '2026-11-15T00:00:00Z',
		items: [
			{
				id: 'item-video-energy',
				type: 'video',
				title: 'Video: Work and Energy Theorems',
				duration: '48 mins',
				locked: false,
				content: {
					id: 'content-video-energy',
					videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
					description: 'An introduction to the work-energy theorem and its applications in mechanics.',
					captionTracks: [
						{ srclang: 'en', label: 'English', src: '/captions/vectors-en.vtt', default: true },
					],
				},
			},
		],
	},
]

const cloneBaseLessons = () => BASE_LESSONS.map((lesson) => ({
	...lesson,
	items: lesson.items.map((item) => ({
		...item,
		content: { ...item.content },
	})),
}))

export const COURSES_BY_PROGRAM = {
	p1: [
		{
			id: 'ds-101',
			programId: 'p1',
			trackId: 'tech',
			track: 'Innovation Lab',
			status: 'active',
			title: 'Data Science & AI Foundations',
			progress: 45,
			instructor: { id: 'inst-sarah-lin', name: 'Dr. Sarah Lin' },
			teachingTeam: [
				{ id: 'team-adeyemi', name: 'Prof. Adeyemi', role: 'Lead Instructor', avatarInitial: 'A' },
				{ id: 'team-tobi', name: 'Tobi O.', role: 'Teaching Assistant', avatarInitial: 'T' },
			],
			image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
			homeSubtitle: 'Innovation Lab',
			homeDescription:
				'Build foundations in data science, model thinking, and practical AI use-cases with guided projects.',
			lessons: cloneBaseLessons(),
		},
		{
			id: 'py-099',
			programId: 'p1',
			trackId: 'tech',
			track: 'Innovation Lab',
			status: 'completed',
			title: 'Python Programming Bootcamp',
			progress: 100,
			instructor: { id: 'inst-tobi', name: 'Engr. Tobi' },
			teachingTeam: [
				{ id: 'team-tobi', name: 'Tobi O.', role: 'Lead Instructor', avatarInitial: 'T' },
			],
			image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
			homeSubtitle: 'Innovation Lab',
			homeDescription:
				'Reinforce Python fluency for data and backend tasks through labs and coding drills.',
			lessons: cloneBaseLessons(),
		},
		{
			id: 'ml-301',
			programId: 'p1',
			trackId: 'tech',
			track: 'Innovation Lab',
			status: 'future',
			title: 'Machine Learning Engineering',
			progress: 0,
			instructor: { id: 'inst-sarah-lin', name: 'Dr. Sarah Lin' },
			teachingTeam: [
				{ id: 'team-adeyemi', name: 'Prof. Adeyemi', role: 'Lead Instructor', avatarInitial: 'A' },
			],
			image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
			homeSubtitle: 'Innovation Lab',
			homeDescription:
				'Learn production-grade ML systems and deployment strategies once this course opens.',
			lessons: cloneBaseLessons(),
		},
	],
	p2: [
		{
			id: 'fs-201',
			programId: 'p2',
			trackId: 'tech',
			track: 'Innovation Lab',
			status: 'active',
			title: 'Full-Stack Engineering Core',
			progress: 38,
			instructor: { id: 'inst-rahman-ahmed', name: 'R. Ahmed' },
			teachingTeam: [
				{ id: 'team-rahman', name: 'R. Ahmed', role: 'Lead Instructor', avatarInitial: 'R' },
			],
			image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80',
			homeSubtitle: 'Innovation Lab',
			homeDescription: 'Ship modern frontend and backend features with production-ready workflows.',
			lessons: cloneBaseLessons(),
		},
	],
	p3: [
		{
			id: 'math-201',
			programId: 'p3',
			trackId: 'academic',
			track: 'Pre-University',
			status: 'active',
			title: 'Advanced Calculus (A-Level)',
			progress: 12,
			instructor: { id: 'inst-adeyemi', name: 'Prof. Adeyemi' },
			teachingTeam: [
				{ id: 'team-adeyemi', name: 'Prof. Adeyemi', role: 'Lead Instructor', avatarInitial: 'A' },
				{ id: 'team-tobi', name: 'Tobi O.', role: 'Teaching Assistant', avatarInitial: 'T' },
			],
			image: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800&q=80',
			homeSubtitle: 'Pre-University Physics',
			homeDescription:
				'Develop advanced mathematical intuition for A-Level mechanics, calculus, and modeling.',
			lessons: cloneBaseLessons(),
		},
	],
	p4: [
		{
			id: 'utme-111',
			programId: 'p4',
			trackId: 'academic',
			track: 'Pre-University',
			status: 'active',
			title: 'UTME Mathematics Intensive',
			progress: 56,
			instructor: { id: 'inst-nwosu', name: 'K. Nwosu' },
			teachingTeam: [
				{ id: 'team-nwosu', name: 'K. Nwosu', role: 'Lead Instructor', avatarInitial: 'K' },
			],
			image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
			homeSubtitle: 'Pre-University Studies',
			homeDescription:
				'Prepare for UTME mathematics with timed drills, strategy sessions, and review clinics.',
			lessons: cloneBaseLessons(),
		},
	],
}

export const ALL_COURSES = Object.values(COURSES_BY_PROGRAM).flat()

export const ACTIVE_COURSES_BY_PROGRAM = Object.fromEntries(
	Object.entries(COURSES_BY_PROGRAM).map(([programId, courses]) => [
		programId,
		courses.filter((course) => course.status === 'active'),
	])
)

export const getCourseById = (courseId) => ALL_COURSES.find((course) => course.id === courseId)
