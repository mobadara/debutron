export const admissionsPageData = {
  hero: {
    title: 'Admissions at Debutron Lab',
    body:
      'We evaluate more than just grades. Our holistic admission process identifies potential, maps your unique learning profile, and prepares you for rigorous academic and technical excellence.',
  },
  requirementsTitle: 'Program Entry Requirements',
  tabs: [
    {
      id: 'o-level',
      label: 'O-Level Mastery',
      type: 'list',
      items: [
        'Must be in the penultimate year of Senior Secondary School OR provide evidence of a previous O-Level attempt.',
        'Successful completion of the Debutron Lab Entrance Examination.',
        'Completion of our holistic Personality Survey and Aptitude Test (used to tailor our empathetic teaching approach).',
        'Must have reliable access to a personal computer or tablet for digital portal assignments.',
      ],
    },
    {
      id: 'utme',
      label: 'UTME Accelerator',
      type: 'list',
      items: [
        'Evidence of registration or prior attempt of an O-Level examination.',
        'Successful completion of the UTME Diagnostic Entrance Examination.',
        'Completion of our comprehensive Personality and Aptitude Test to map your learning profile.',
        'Must have reliable access to a personal computer or tablet to utilize our AI-driven CBT simulation portal.',
      ],
    },
    {
      id: 'tech',
      label: 'Tech Innovation Tracks',
      type: 'list',
      items: [
        'Demonstrated passion for complex problem-solving and a strong foundational love for mathematics.',
        'Hardware Requirement: Must possess a highly capable PC (Minimum: Core i5/i7 processor, 500GB SSD, 8GB-16GB RAM).',
        'Exceptional personal motivation, discipline, and a goal-driven mindset.',
        'Successful completion of our Technical Assessment Test.',
        'Completion of the holistic Personality and Aptitude Test.',
      ],
    },
    {
      id: 'a-level',
      label: 'A-Level Excellence',
      type: 'coming-soon',
      notice: 'Coming Soon',
      body:
        'Enrollment requirements for our direct-entry Cambridge A-Level and JUPEB programs will be published shortly. Please check back or contact admissions for timeline updates.',
    },
  ],
  cta: {
    title: 'Ready to begin your journey?',
    label: 'Start Application',
    link: '/apply',
  },
}
