import { academicTracks, ictTracks } from '../domains/programsServicesContent'

export const programsMainPageData = {
  title: 'Academics & Career Pathways',
  subtitle:
    'Choose the learning path that fits your goals, from exam success pathways to practical digital career training.',
  pathwayCards: [
    {
      id: 'academics-pathway',
      image: 'https://images.unsplash.com/photo-1427504494785-a4f97bc25f2d?w=1200&h=800&fit=crop',
      imageAlt: 'Students preparing for examinations',
      title: 'Exam Mastery Academy',
      description:
        'Structured academic coaching for WASSCE, NECO, GCE, A-Level, and UTME, delivered with close mentorship and progress tracking.',
      bullets: [
        'Subject-by-subject exam reinforcement',
        'A-Level Classes',
        'Mock exams and revision clinics',
      ],
      link: '/programs/academics',
      cta: 'Explore Pathway',
      icon: 'book',
    },
    {
      id: 'ict-pathway',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=800&fit=crop',
      imageAlt: 'Learners collaborating on digital skills training',
      title: 'Digital Career Accelerator',
      description:
        'Hands-on technology training built for modern employability, including software engineering, data analytics, cyber security, and cloud tools.',
      bullets: [
        'Project-based, portfolio-first training',
        'Software Engineering',
        'Flexible online or on-site delivery',
      ],
      link: '/programs/ict',
      cta: 'Explore Pathway',
      icon: 'laptop',
    },
  ],
}

export const allPrograms = [...academicTracks, ...ictTracks]
