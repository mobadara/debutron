import { BrowserRouter as Router, Outlet, Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/layout/Header'
import Footer from './components/layout/Footer'
import TopUtilityBar from './components/layout/TopUtilityBar'
import PortalHeader from './components/layout/PortalHeader'
import PortalSidebar from './components/layout/PortalSidebar'
import PortalFooter from './components/layout/PortalFooter'
import Home from './pages/HomePage'
import Admissions from './pages/Admissions'
import StudentLogin from './pages/StudentLogin'
import StaffLogin from './pages/StaffLogin'
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
import NotFoundPage from './pages/NotFoundPage'
// (imports above already include StudentTuition and StudentProfile)

const MainLayout = () => (
	<div className="flex flex-col min-h-screen">
		<TopUtilityBar />
		<Navbar />
		<main className="flex-grow">
			<Outlet />
		</main>
		<Footer />
	</div>
)

const PortalLayout = () => {
	const [sidebarOpen, setSidebarOpen] = useState(() => {
		try {
			return localStorage.getItem('portalSidebarOpen') === 'true'
		} catch {
			return false
		}
	})

	useEffect(() => {
		try {
			localStorage.setItem('portalSidebarOpen', sidebarOpen)
		} catch {
			// ignore
		}
	}, [sidebarOpen])

	return (
		<div className="min-h-screen flex flex-col bg-gray-50">
			<PortalHeader onToggleSidebar={() => setSidebarOpen((s) => !s)} />

			<div className="flex flex-1">
				{/* Sidebar (desktop + mobile) */}
				<PortalSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

				<main className="flex-1 overflow-y-auto p-6">
					<Outlet />
				</main>
			</div>

			<PortalFooter />
		</div>
	)
}

function App() {
	return (
		<Router>
			<Routes>
				{/* PUBLIC LAYOUT */}
				<Route element={<MainLayout />}>
					<Route path="/" element={<Home />} />
					<Route path="/admissions" element={<Admissions />} />
				</Route>

				{/* STANDALONE AUTH ROUTES (NO LAYOUT WRAPPERS) */}
				<Route path="/login/student" element={<StudentLogin />} />
				<Route path="/login/staff" element={<StaffLogin />} />

				{/* PRIVATE PORTAL LAYOUT */}
				<Route element={<PortalLayout />}>
					{/* TODO: Wrap this PortalLayout group in a <ProtectedRoute> component once FastAPI JWT authentication is ready. */}
					<Route path="/student/dashboard" element={<StudentDashboard />} />
					<Route path="/student/transcript" element={<StudentTranscript />} />
					<Route path="/student/courses" element={<StudentCourses />} />
					<Route path="/student/courses/:id" element={<CourseDetail />} />
					<Route path="/student/graduation" element={<GraduationHub />} />
					<Route path="/student/tuition" element={<StudentTuition />} />
					<Route path="/student/profile" element={<StudentProfile />} />
					<Route path="/student/calendar" element={<StudentCalendar />} />
					<Route path="/student/elibrary" element={<StudentLibrary />} />
					<Route path="/student/settings" element={<StudentSettings />} />
				</Route>

				{/* GLOBAL 404 (catch-all) */}
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</Router>
	)
}

export default App
