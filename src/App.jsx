import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import useAuthStore from './store/authStore'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Students from './pages/Students'
import Attendance from './pages/Attendance'
import Fees from './pages/Fees'
import Batches from './pages/Batches'
import Homework from './pages/Homework'
import Tests from './pages/Tests'
import Broadcast from './pages/Broadcast'
import Navigation from './components/Navigation'

function App() {
  const user = useAuthStore((state) => state.user)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [])

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return (
    <Router basename="/the-commerce-room">
      {user && <Navigation />}
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/students" element={user ? <Students /> : <Navigate to="/login" />} />
        <Route path="/attendance" element={user ? <Attendance /> : <Navigate to="/login" />} />
        <Route path="/fees" element={user ? <Fees /> : <Navigate to="/login" />} />
        <Route path="/batches" element={user ? <Batches /> : <Navigate to="/login" />} />
        <Route path="/homework" element={user ? <Homework /> : <Navigate to="/login" />} />
        <Route path="/tests" element={user ? <Tests /> : <Navigate to="/login" />} />
        <Route path="/broadcast" element={user ? <Broadcast /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  )
}

export default App
