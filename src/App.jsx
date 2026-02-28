import { BrowserRouter as Router, Outlet, Route, Routes } from 'react-router-dom'
import Navbar from './components/layout/Header'
import Footer from './components/layout/Footer'
import TopUtilityBar from './components/layout/TopUtilityBar'
import PortalHeader from './components/layout/PortalHeader'
import PortalFooter from './components/layout/PortalFooter'
import Home from './pages/HomePage'
import Admissions from './pages/Admissions'
import StudentLogin from './pages/StudentLogin'
import StaffLogin from './pages/StaffLogin'
import StudentDashboard from './pages/StudentDashboard'

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

const PortalLayout = () => (
	<div className="min-h-screen flex flex-col bg-gray-50">
		<PortalHeader />
		<main className="flex-grow flex">
			<div className="flex-1 overflow-y-auto">
				<Outlet />
			</div>
		</main>
		<PortalFooter />
	</div>
)

function App() {
	return (
		<Router>
			<Routes>
				<Route element={<MainLayout />}>
					<Route path="/" element={<Home />} />
					<Route path="/admissions" element={<Admissions />} />
				</Route>

				<Route path="/login/student" element={<StudentLogin />} />
				<Route path="/login/staff" element={<StaffLogin />} />

				<Route element={<PortalLayout />}>
					{/* TODO: Wrap this PortalLayout group in a <ProtectedRoute> component once FastAPI JWT authentication is ready. */}
					<Route path="/student/dashboard" element={<StudentDashboard />} />
				</Route>
			</Routes>
		</Router>
	)
}

export default App
