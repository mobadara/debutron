import 'katex/dist/katex.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom'
import { A11yProvider } from '@debutron/ui'

import LMSDashboard from './pages/LMSDashboard'
import LMSLogin from './pages/LMSLogin'
import LMSLayout from './components/layout/LMSLayout'
import GlobalForum from './pages/GlobalForum'
import ForumNewDiscussion from './pages/ForumNewDiscussion'
import DiscussionView from './pages/DiscussionView'
import AllCourses from './pages/AllCourses';
import LessonViewer from './pages/LessonViewer';
import CourseLayout from './layouts/CourseLayout';
import CourseOverview from './pages/CourseOverview';
import CourseContents from './pages/CourseContents';

function LegacyCourseHomeRedirect() {
  const { courseId } = useParams()
  return <Navigate to={`/course/${courseId}/contents`} replace />
}

function App() {
  return (
    <A11yProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LMSLogin />} />
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path="/" element={<LMSLayout />}>
            <Route path="dashboard" element={<LMSDashboard />} />
            <Route path="forums/global" element={<GlobalForum />} />
            <Route path="forums/course/:courseId" element={<GlobalForum />} />
            <Route path="forums/discussion/:postId" element={<DiscussionView />} />
            <Route path="forums/global/new" element={<ForumNewDiscussion />} />
            <Route path="courses" element={<AllCourses />} />

            {/* The Cleaned Up Course Nested Routing */}
            <Route path="course/:courseId" element={<CourseLayout />}>
              <Route index element={<Navigate to="overview" replace />} />
              <Route path="overview" element={<CourseOverview />} />
              <Route path="contents" element={<CourseContents />} />
            </Route>

            <Route path="course/:courseId/home" element={<LegacyCourseHomeRedirect />} />
            
            {/* Lesson Viewer lives outside CourseLayout so it can take up the full screen */}
            <Route path="course/:courseId/lesson/:lessonId" element={<LessonViewer />} />
          </Route>
        </Routes>
      </Router>
    </A11yProvider>
  )
}

export default App