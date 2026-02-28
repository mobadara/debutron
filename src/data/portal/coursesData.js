export const studentCourses = [
  {
    id: 'DSC-101',
    code: 'DSC-101',
    title: 'Python for Data Science',
    instructor: 'Dr. Adeyemi',
    rep: 'Sarah O.',
    schedule: 'Tuesdays & Thursdays, 10:00 AM',
    location: 'Lab 2 (Onsite)',
    status: 'Active',
  },
  {
    id: 'DSP-210',
    code: 'DSP-210',
    title: 'Data Processing & Pipelines',
    instructor: 'Dr. Okonkwo',
    rep: 'Amina K.',
    schedule: 'Mondays & Wednesdays, 2:00 PM',
    location: 'Lab 1 (Onsite)',
    status: 'Active',
  },
  {
    id: 'MLA-330',
    code: 'MLA-330',
    title: 'Applied Machine Learning',
    instructor: 'Prof. Ibe',
    rep: 'Daniel E.',
    schedule: 'Fridays, 9:00 AM',
    location: 'Hybrid - Room 5',
    status: 'Active',
  },
]

export const getCourseById = (courseId) => studentCourses.find((course) => course.id === courseId)
