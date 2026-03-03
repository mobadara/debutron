import { BrowserRouter as Router, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import { FiUser } from 'react-icons/fi'
import Navbar from './components/layout/Header'
import Footer from './components/layout/Footer'
import TopUtilityBar from './components/layout/TopUtilityBar'
import GlobalSidebar from './components/layout/GlobalSidebar'
import PortalFooter from './components/layout/PortalFooter'
import Home from './pages/HomePage'
import Admissions from './pages/Admissions'
import AboutPage from './pages/AboutPage'
import VisionValues from './pages/VisionValues'
import LeadershipTeam from './pages/LeadershipTeam'
import InnovationLab from './pages/InnovationLab'
import Accreditations from './pages/Accreditations'
import Careers from './pages/Careers'
import AiDataModels from './pages/AiDataModels'
import EnterpriseConsulting from './pages/EnterpriseConsulting'
import StudentShowcase from './pages/StudentShowcase'
import OLevelMastery from './pages/OLevelMastery'
import ALevelExcellence from './pages/ALevelExcellence'
import UtmeAccelerator from './pages/UtmeAccelerator'
import DataScience from './pages/DataScience'
import DataAnalytics from './pages/DataAnalytics'
import CloudEngineering from './pages/CloudEngineering'
import CyberSecurity from './pages/CyberSecurity'
import SoftwareEngineering from './pages/SoftwareEngineering'
import PearsonVue from './pages/PearsonVue'
import EduConsulting from './pages/EduConsulting'
import ExamRegistration from './pages/ExamRegistration'
import Contact from './pages/Contact'
import NewsPage from './pages/NewsPage'
import NewsDetail from './pages/NewsDetail'
import EventsPage from './pages/EventsPage'
import EventDetail from './pages/EventDetail'
import TechTracks from './pages/TechTracks'
import ProgramsMainPage from './pages/programs/ProgramsMainPage'
import AcademicsPage from './pages/programs/AcademicsPage'
import IctPage from './pages/programs/IctPage'
import ProgramDetailPage from './pages/programs/ProgramDetailPage'
import ServicesMainPage from './pages/services/ServicesMainPage'
import ServiceDetailPage from './pages/services/ServiceDetailPage'
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
import UniversityAdmissions from './pages/UniversityAdmissions'
import CareerGraduation from './pages/CareerGraduation'
import ConsultationBooking from './components/ConsultationBooking'
import ApplicationEntry from './components/ApplicationEntry'
import ApplicationForm from './components/ApplicationForm'
import TechTransitionForm from './components/TechTransitionForm'
import NotFound from './pages/NotFoundPage'
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
	const loggedInUser = {
		id: '000001',
		firstName: 'Muyiwa',
		enrolled_tracks: ['A', 'T'],
		active_track: 'A',
	}
	const [activeTrack, setActiveTrack] = useState(loggedInUser.active_track)

	return (
		<div className="min-h-screen flex flex-col bg-gray-50">
			<div className="flex flex-1">
				<GlobalSidebar activeTrack={activeTrack} setActiveTrack={setActiveTrack} user={loggedInUser} />

				<div className="flex-1 flex flex-col overflow-hidden">
					<header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between">
						<h1 className="text-2xl font-serif font-bold text-slate-900">Welcome, {loggedInUser.firstName}</h1>
						<button type="button" className="rounded-full bg-slate-100 p-2 text-slate-600 hover:bg-slate-200 transition-colors" aria-label="Open profile">
							<FiUser className="h-5 w-5" />
						</button>
					</header>

					<main className="flex-1 overflow-y-auto p-6">
						<Outlet context={{ activeTrack, setActiveTrack, user: loggedInUser }} />
					</main>
				</div>
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
					<Route path="/about" element={<AboutPage />} />
					<Route path="/who-we-are" element={<VisionValues />} />
					<Route path="/leadership" element={<LeadershipTeam />} />
					<Route path="/innovation-lab" element={<InnovationLab />} />
					<Route path="/accreditations-partnerships" element={<Accreditations />} />
					<Route path="/careers" element={<Careers />} />
					<Route path="/ai-data-models" element={<AiDataModels />} />
					<Route path="/enterprise-consulting" element={<EnterpriseConsulting />} />
					<Route path="/student-showcase" element={<StudentShowcase />} />
					<Route path="/o-level-mastery" element={<OLevelMastery />} />
					<Route path="/a-level-excellence" element={<ALevelExcellence />} />
					<Route path="/utme-accelerator" element={<UtmeAccelerator />} />
					<Route path="/applied-data-science" element={<DataScience />} />
					<Route path="/data-analytics-insights" element={<DataAnalytics />} />
					<Route path="/cloud-infrastructure-engineering" element={<CloudEngineering />} />
					<Route path="/cyber-defense-security" element={<CyberSecurity />} />
					<Route path="/full-stack-software-engineering" element={<SoftwareEngineering />} />
					<Route path="/pearson-vue" element={<PearsonVue />} />
					<Route path="/educational-consulting" element={<EduConsulting />} />
					<Route path="/educational-consulting/book-consultation" element={<ConsultationBooking />} />
					<Route path="/apply" element={<ApplicationEntry />} />
					<Route path="/apply/step-1" element={<ApplicationForm />} />
					<Route path="/apply/returning" element={<Navigate to="/student/transition-tech" replace />} />
					<Route path="/application" element={<ApplicationForm />} />
					<Route path="/exam-registration" element={<ExamRegistration />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/news" element={<NewsPage />} />
					<Route path="/news/:id" element={<NewsDetail />} />
					<Route path="/events" element={<EventsPage />} />
					<Route path="/events/:id" element={<EventDetail />} />
					<Route path="/programs" element={<ProgramsMainPage />} />
					<Route path="/programs/academics" element={<AcademicsPage />} />
					<Route path="/programs/ict" element={<IctPage />} />
					<Route path="/programs/tech-tracks" element={<TechTracks />} />
					<Route path="/programs/utme-accelerator" element={<UtmeAccelerator />} />
					<Route path="/programs/data-science" element={<DataScience />} />
					<Route path="/programs/data-analytics" element={<DataAnalytics />} />
					<Route path="/programs/software-engineering" element={<SoftwareEngineering />} />
					<Route path="/programs/cloud-engineering" element={<CloudEngineering />} />
					<Route path="/programs/cyber-security" element={<CyberSecurity />} />
					<Route path="/programs/:programId" element={<ProgramDetailPage />} />
					<Route path="/services" element={<ServicesMainPage />} />
					<Route path="/services/:serviceId" element={<ServiceDetailPage />} />
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
					<Route path="/student/university-admissions" element={<UniversityAdmissions />} />
					<Route path="/portal/university-admissions" element={<UniversityAdmissions />} />
					<Route path="/portal/careers" element={<CareerGraduation />} />
					<Route path="/student/transition-tech" element={<TechTransitionForm />} />
					<Route path="/dashboard/transition-tech" element={<TechTransitionForm />} />
				</Route>

				{/* GLOBAL 404 (catch-all) */}
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	)
}

export default App
