import 'katex/dist/katex.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { A11yProvider } from '@debutron/ui'

import LMSDashboard from './pages/LMSDashboard'
import LMSLogin from './pages/LMSLogin'
import LMSLayout from './components/layout/LMSLayout'
import GlobalForum from './pages/GlobalForum'
import ForumNewDiscussion from './pages/ForumNewDiscussion'
import DiscussionView from './pages/DiscussionView'
import AllCourses from './pages/AllCourses';
import CourseHome from './pages/CourseHome';
import LessonViewer from './pages/LessonViewer';

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
            <Route path="forums/course/:courseId" element={<GlobalForum />} />
            <Route path="forums/discussion/:postId" element={<DiscussionView />} />
            <Route path="forums/global/new" element={<ForumNewDiscussion />} />
            <Route path="courses" element={<AllCourses />} />
            <Route path="course/:courseId/home" element={<CourseHome />} />
            <Route path="course/:courseId/lesson/:lessonId" element={<LessonViewer />} />
          </Route>
        </Routes>
      </Router>
    </A11yProvider>
  )
}

export default App