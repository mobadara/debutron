import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import PortalLayout from './layouts/PortalLayout'

// Portal Pages
import StudentDashboard from './pages/StudentDashboard'
import StudentTranscript from './pages/StudentTranscript'
import StudentCourses from './pages/StudentCourses'
import CourseDetail from './pages/CourseDetail'
import GraduationHub from './pages/GraduationHub'
import StudentTuition from './pages/StudentTuition'
import StudentProfile from './pages/StudentProfile'
import StudentCalendar from './pages/StudentCalendar'
import StudentLibrary from './pages/StudentLibrary'
import StudentSettings from './pages/StudentSettings'
import UniversityAdmissions from './pages/UniversityAdmissions'
import CareerGraduation from './pages/CareerGraduation'
import TechTransitionForm from './components/TechTransitionForm'
import StudentLogin from './pages/StudentLogin'
import StaffLogin from './pages/StaffLogin'

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Navigate to="/student/dashboard" replace />} />
				<Route path="/student" element={<PortalLayout />}>
					<Route index element={<Navigate to="dashboard" replace />} />
					<Route path="dashboard" element={<StudentDashboard />} />
					<Route path="transcript" element={<StudentTranscript />} />
					<Route path="courses" element={<StudentCourses />} />
					<Route path="courses/:id" element={<CourseDetail />} />
					<Route path="graduation" element={<GraduationHub />} />
					<Route path="tuition" element={<StudentTuition />} />
					<Route path="profile" element={<StudentProfile />} />
					<Route path="calendar" element={<StudentCalendar />} />
					<Route path="elibrary" element={<StudentLibrary />} />
					<Route path="settings" element={<StudentSettings />} />
					<Route path="university-admissions" element={<UniversityAdmissions />} />
					<Route path="careers" element={<CareerGraduation />} />
					<Route path="transition-tech" element={<TechTransitionForm />} />
				</Route>
				<Route path="/dashboard" element={<Navigate to="/student/dashboard" replace />} />
				<Route path="/courses" element={<Navigate to="/student/courses" replace />} />
				<Route path="/transcript" element={<Navigate to="/student/transcript" replace />} />
				<Route path="/calendar" element={<Navigate to="/student/calendar" replace />} />
				<Route path="/tuition" element={<Navigate to="/student/tuition" replace />} />
				<Route path="/settings" element={<Navigate to="/student/settings" replace />} />
				<Route path="/login/student" element={<StudentLogin />} />
				<Route path="/login/staff" element={<StaffLogin />} />
				<Route path="*" element={<Navigate to="/student/dashboard" replace />} />
			</Routes>
		</Router>
	)
}

export default App