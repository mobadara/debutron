import { Navigate, Route, Routes } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import AboutPage from './pages/AboutPage'
import Contact from './pages/Contact'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import LeadershipTeam from './pages/LeadershipTeam'
import StaffDirectoryPage from './pages/StaffDirectoryPage'
import Admissions from './pages/Admissions'
import VisionValues from './pages/VisionValues'
import InnovationLab from './pages/InnovationLab'
import Accreditations from './pages/Accreditations'
import Careers from './pages/Careers'
import ProgramsMainPage from './pages/programs/ProgramsMainPage'
import AcademicsPage from './pages/programs/AcademicsPage'
import IctPage from './pages/programs/IctPage'
import ProgramDetailPage from './pages/programs/ProgramDetailPage'
import ServicesMainPage from './pages/services/ServicesMainPage'
import ServiceDetailPage from './pages/services/ServiceDetailPage'
import AiDataModels from './pages/AiDataModels'
import EnterpriseConsulting from './pages/EnterpriseConsulting'
import StudentShowcase from './pages/StudentShowcase'
import PearsonVue from './pages/PearsonVue'
import EduConsulting from './pages/EduConsulting'
import ExamRegistration from './pages/ExamRegistration'
import OLevelMastery from './pages/OLevelMastery'
import UtmeAccelerator from './pages/UtmeAccelerator'
import ALevelExcellence from './pages/ALevelExcellence'
import DataScience from './pages/DataScience'
import SoftwareEngineering from './pages/SoftwareEngineering'
import DataAnalytics from './pages/DataAnalytics'
import CloudEngineering from './pages/CloudEngineering'
import CyberSecurity from './pages/CyberSecurity'
import TechTracks from './pages/TechTracks'
import NewsPage from './pages/NewsPage'
import NewsDetail from './pages/NewsDetail'
import EventsPage from './pages/EventsPage'
import EventDetail from './pages/EventDetail'
import ApplicationForm from './components/ApplicationForm'

function App() {
	return (
		<Routes>
			<Route element={<MainLayout />}>
				<Route path="/" element={<HomePage />} />
				<Route path="/about" element={<AboutPage />} />
				<Route path="/who-we-are" element={<VisionValues />} />
				<Route path="/leadership" element={<LeadershipTeam />} />
				<Route path="/innovation-lab" element={<InnovationLab />} />
				<Route path="/accreditations-partnerships" element={<Accreditations />} />
				<Route path="/careers" element={<Careers />} />
				<Route path="/staff-directory" element={<StaffDirectoryPage />} />
				<Route path="/admissions" element={<Admissions />} />
				<Route path="/apply" element={<ApplicationForm />} />
				<Route path="/programs" element={<ProgramsMainPage />} />
				<Route path="/programs/tech-tracks" element={<TechTracks />} />
				<Route path="/programs/academics" element={<AcademicsPage />} />
				<Route path="/programs/ict" element={<IctPage />} />
				<Route path="/programs/data-science" element={<Navigate to="/applied-data-science" replace />} />
				<Route path="/programs/software-engineering" element={<Navigate to="/full-stack-software-engineering" replace />} />
				<Route path="/programs/data-analytics" element={<Navigate to="/data-analytics-insights" replace />} />
				<Route path="/programs/cloud-engineering" element={<Navigate to="/cloud-infrastructure-engineering" replace />} />
				<Route path="/programs/cyber-security" element={<Navigate to="/cyber-defense-security" replace />} />
				<Route path="/programs/utme-accelerator" element={<Navigate to="/utme-accelerator" replace />} />
				<Route path="/programs/:programId" element={<ProgramDetailPage />} />
				<Route path="/a-level-excellence" element={<ALevelExcellence />} />
				<Route path="/utme-accelerator" element={<UtmeAccelerator />} />
				<Route path="/applied-data-science" element={<DataScience />} />
				<Route path="/data-analytics-insights" element={<DataAnalytics />} />
				<Route path="/cloud-infrastructure-engineering" element={<CloudEngineering />} />
				<Route path="/cyber-defense-security" element={<CyberSecurity />} />
				<Route path="/full-stack-software-engineering" element={<SoftwareEngineering />} />
				<Route path="/services" element={<ServicesMainPage />} />
				<Route path="/services/:serviceId" element={<ServiceDetailPage />} />
				<Route path="/ai-data-models" element={<AiDataModels />} />
				<Route path="/enterprise-consulting" element={<EnterpriseConsulting />} />
				<Route path="/student-showcase" element={<StudentShowcase />} />
				<Route path="/pearson-vue" element={<PearsonVue />} />
				<Route path="/educational-consulting" element={<EduConsulting />} />
				<Route path="/exam-registration" element={<ExamRegistration />} />
				<Route path="/o-level-mastery" element={<OLevelMastery />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/news" element={<NewsPage />} />
				<Route path="/news/:id" element={<NewsDetail />} />
				<Route path="/events" element={<EventsPage />} />
				<Route path="/events/:id" element={<EventDetail />} />
				<Route path="*" element={<NotFoundPage />} />
			</Route>
		</Routes>
	)
}

export default App;
