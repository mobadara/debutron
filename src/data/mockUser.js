export const mockLoggedInUser = {
  id: "000001",
  firstName: "Muyiwa",
  
  // Enrolled Tracks: 'A' (Academic), 'T' (Tech)
  enrolled_tracks: ['A', 'T'], 
  
  // Specific Programs: 'utme', 'o-level', 'data-science', 'cloud', 'cyber', 'fullstack'
  enrolled_programs: ['utme', 'data-science'], 
  
  // UI State Preferences
  active_track: 'A', 
  active_program: 'data-science',
  
  // Progression Flags (Controls the Alumni Promo Lock)
  academic_status: 'Active', // Change to 'Graduated' to test unlocking
  has_university_admission: true // Change to true to test unlocking
};

export const programNames = { 
  'utme': 'UTME Accelerator', 
  'o-level': 'O-Level Mastery', 
  'data-science': 'Applied Data Science', 
  'cloud': 'Cloud Engineering',
  'cyber': 'Cyber Defence',
  'fullstack': 'Software Engineering'
};


const billingProfiles = {
  'utme': { 
    NGN: { total: 150000, paid: 50000, symbol: '₦' }, 
    USD: { total: 150, paid: 50, symbol: '$' }, 
    plan: 'Installment', nextDueDate: '2026-04-01' 
  },
  'data-science': { 
    NGN: { total: 500000, paid: 300000, symbol: '₦' }, 
    USD: { total: 500, paid: 300, symbol: '$' }, 
    plan: 'Installment', nextDueDate: '2026-05-15' 
  },
};