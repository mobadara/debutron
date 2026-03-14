export const mockForumCurrentUserId = 'usr-student-tunde'

export const mockForumUsers = [
  {
    id: 'usr-instructor-ada',
    name: 'Dr. Ada Nwosu',
    role: 'Instructor',
    title: 'Lead Instructor, Applied AI',
    contributionCount: 148,
    avatar: 'https://ui-avatars.com/api/?name=Dr+Ada+Nwosu&background=1E293B&color=fff&size=96',
  },
  {
    id: 'usr-ta-ifeoma',
    name: 'Ifeoma Bello',
    role: 'TA',
    title: 'Teaching Assistant, Full-Stack Engineering',
    contributionCount: 121,
    avatar: 'https://ui-avatars.com/api/?name=Ifeoma+Bello&background=475569&color=fff&size=96',
  },
  {
    id: 'usr-student-tunde',
    name: 'Tunde Afolayan',
    role: 'Student',
    title: 'Student, Full-Stack Engineering',
    contributionCount: 87,
    avatar: 'https://ui-avatars.com/api/?name=Tunde+Afolayan&background=0F766E&color=fff&size=96',
  },
]

export const mockForumThreadsSeed = [
  {
    id: 'th-1',
    title: 'How should we design AI tutor prompts for JAMB revision cohorts?',
    tags: ['AI', 'JAMB', 'Learning Design'],
    authorId: 'usr-instructor-ada',
    content:
      'I would like us to prototype an AI tutor flow that balances concept explanation, worked examples, and spaced recall. Backend support should eventually store prompt templates, learner responses, and revision analytics per cohort.',
    stats: { likes: 34, views: 182 },
    timeAgo: '2 hours ago',
    comments: [
      {
        id: 'cm-1',
        authorId: 'usr-student-tunde',
        content: 'Could the tutor ask diagnostic questions first so the study plan adapts to weak topics?',
        timeAgo: '54 mins ago',
        replies: [
          {
            id: 'rp-1',
            authorId: 'usr-ta-ifeoma',
            content: 'Yes. It would help if the backend exposes a proficiency snapshot for each learner before the tutor generates the next prompt set.',
            timeAgo: '31 mins ago',
          },
        ],
      },
      {
        id: 'cm-2',
        authorId: 'usr-ta-ifeoma',
        content: 'We should also log which prompt variants produce the best completion rates so the product team can iterate intelligently.',
        timeAgo: '18 mins ago',
        replies: [],
      },
    ],
  },
  {
    id: 'th-2',
    title: 'What API shape should support assignment clarification between students and teaching staff?',
    tags: ['Assignments', 'API Design', 'Support'],
    authorId: 'usr-ta-ifeoma',
    content:
      'For backend planning, I think each clarification thread should be linked to a course, lesson, author role, and resolution status. This will let the LMS surface unanswered questions and escalations cleanly.',
    stats: { likes: 22, views: 143 },
    timeAgo: '5 hours ago',
    comments: [
      {
        id: 'cm-3',
        authorId: 'usr-instructor-ada',
        content: 'Agreed. Please include `status`, `assignedModeratorId`, and `resolvedAt` so staff workflows remain auditable.',
        timeAgo: '3 hours ago',
        replies: [],
      },
    ],
  },
  {
    id: 'th-3',
    title: 'If we simulate a student-led study circle, what engagement metrics should be persisted?',
    tags: ['Community', 'Metrics', 'Study Circle'],
    authorId: 'usr-student-tunde',
    content:
      'I want the prototype to feel realistic. It may help to store reactions, thread views, replies, and whether a teaching staff member has stepped into the conversation.',
    stats: { likes: 16, views: 97 },
    timeAgo: '1 day ago',
    comments: [
      {
        id: 'cm-4',
        authorId: 'usr-instructor-ada',
        content: 'Store a moderation flag as well. That gives the academic team a clear view of which discussions require intervention.',
        timeAgo: '20 hours ago',
        replies: [
          {
            id: 'rp-2',
            authorId: 'usr-student-tunde',
            content: 'That makes sense. A boolean plus moderation notes should probably be enough for the first backend milestone.',
            timeAgo: '18 hours ago',
          },
        ],
      },
    ],
  },
]