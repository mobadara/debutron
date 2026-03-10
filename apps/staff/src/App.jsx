import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import { A11yProvider } from '@debutron/ui'
import StaffLogin from './pages/StaffLogin'

function App() {
  return (
    <A11yProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<StaffLogin />} />
          <Route
            path="/dashboard"
            element={<div className="p-10 text-2xl font-bold">Staff Dashboard (Coming Soon)</div>}
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </A11yProvider>
  )
}

export default App
