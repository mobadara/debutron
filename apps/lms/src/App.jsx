import 'katex/dist/katex.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { A11yProvider } from '@debutron/ui'

import LMSDashboard from './pages/LMSDashboard'
import LMSLogin from './pages/LMSLogin'
import LMSLayout from './components/layout/LMSLayout'
import CourseSidebar from './components/course/CourseSidebar'
import LessonViewer from './pages/LessonViewer'
import GlobalForum from './pages/GlobalForum'
import ForumNewDiscussion from './pages/ForumNewDiscussion'
import DiscussionView from './pages/DiscussionView'

const PROGRAM_SIDEBAR_CONFIG = {
  p1: { courseTitle: 'Data Science & AI', trackType: 'T' },
  p2: { courseTitle: 'Full-Stack Engineering', trackType: 'T' },
  p3: { courseTitle: 'A-Levels (Science)', trackType: 'A', academicLevel: 'A-Level' },
  p4: { courseTitle: 'UTME Intensive', trackType: 'A', academicLevel: 'UTME' },
}

function CourseWorkspace() {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const track = params.get('track')
  const program = params.get('program')

  const sidebarConfig =
    PROGRAM_SIDEBAR_CONFIG[program] ||
    (track === 'academic'
      ? { courseTitle: 'A-Levels (Science)', trackType: 'A', academicLevel: 'A-Level' }
      : { courseTitle: 'Data Science & AI', trackType: 'T' })

  return (
    <div className="flex w-full h-[calc(100vh-64px)]">
      <CourseSidebar
        courseTitle={sidebarConfig.courseTitle}
        trackType={sidebarConfig.trackType}
        academicLevel={sidebarConfig.academicLevel}
      />
      <main className="flex-1 overflow-y-auto bg-white dark:bg-slate-950 relative">
        <LessonViewer />
      </main>
    </div>
  )
}

function App() {
  return (
    <A11yProvider>
      <Router>
        <Routes>
          {/* 2. The Standalone Login Route (No TopBar, No Footer) */}
          <Route path="/login" element={<LMSLogin />} />

          {/* 3. The Root Redirect now points to Login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* 4. The Authenticated App Layout */}
          <Route path="/" element={<LMSLayout />}>
            <Route path="dashboard" element={<LMSDashboard />} />
            <Route path="forums/global" element={<GlobalForum />} />
            <Route path="forums/discussion/:postId" element={<DiscussionView />} />
            <Route path="forums/global/new" element={<ForumNewDiscussion />} />
            
            <Route path="course/*" element={
              <div className="flex w-full h-[calc(100vh-64px)]"> 
                <CourseSidebar courseTitle="Data Science & AI Foundations" trackType="T" />
                <main className="flex-1 overflow-y-auto bg-white dark:bg-slate-950 relative">
                   <LessonViewer />
                </main>
              </div>
            } />
          </Route>
        </Routes>
      </Router>
    </A11yProvider>
  )
}

export default App