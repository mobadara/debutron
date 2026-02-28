export const portalNotifications = [
  { id: 1, text: 'New resource added to Data Science eLibrary.', time: '2 hours ago', read: false },
  { id: 2, text: 'Your payment of ₦150,000 was successful.', time: '1 day ago', read: false },
]

export const defaultNotificationPreferences = {
  gradesEmail: true,
  tuitionEmail: true,
  urgentSms: false,
}

export const settingsNotificationHistory = [
  {
    id: 1,
    source: 'System',
    message: 'Your application ID DEB-26-001 was successfully verified.',
    timestamp: 'Feb 27, 2026 · 09:15 AM',
  },
  {
    id: 2,
    source: 'Finance',
    message: 'Your payment of ₦150,000 was received and posted to your tuition ledger.',
    timestamp: 'Feb 26, 2026 · 03:42 PM',
  },
  {
    id: 3,
    source: 'Academics',
    message: 'Grade released for Mathematical Foundations of Data Science (DSC-101).',
    timestamp: 'Feb 25, 2026 · 11:08 AM',
  },
  {
    id: 4,
    source: 'Timetable',
    message: 'Urgent schedule update: Thursday lab session moved to 1:00 PM.',
    timestamp: 'Feb 24, 2026 · 07:30 AM',
  },
  {
    id: 5,
    source: 'Library',
    message: 'New resource added to Data Science eLibrary: Applied Statistics Workbook.',
    timestamp: 'Feb 22, 2026 · 06:10 PM',
  },
]

export const portalStudentIdentity = {
  name: 'Muyiwa',
  id: '000001',
}
