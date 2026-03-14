export const LMS_STUDENT = {
	id: 'student-muyiwa',
	name: 'Muyiwa',
	studentCode: 'DL-2026-8492',
	headshot: 'https://ui-avatars.com/api/?name=Muyiwa&background=0D8ABC&color=fff&size=128',
	enrolledTrackIds: ['tech', 'academic'],
	badgesByTrack: {
		tech: [
			{ id: 'badge-tech-cohort', label: 'Cohort', value: '2026 Cohort 1' },
			{ id: 'badge-tech-phase', label: 'Phase', value: 'Phase 1: Core Foundations' },
		],
		academic: [
			{ id: 'badge-academic-session', label: 'Session', value: '2026/2027' },
			{ id: 'badge-academic-term', label: 'Term', value: 'Term 1 (AS Level)' },
		],
	},
}

export const LMS_CALENDAR_EVENTS = [
	{ id: 'event-ds-project', date: new Date(2026, 2, 15), title: 'Data Science Project Due' },
	{ id: 'event-utme-mock', date: new Date(2026, 2, 20), title: 'UTME Mock Exam CBT' },
	{ id: 'event-guest-lecture', date: new Date(2026, 2, 25), title: 'Live Guest Lecture' },
]
