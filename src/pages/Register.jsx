import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import useAuthStore from '../store/authStore'
import { User, Mail, Lock, Briefcase } from 'lucide-react'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'teacher', // admin, teacher, student
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const register = useAuthStore((state) => state.register)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRegister = (e) => {
    e.preventDefault()
    setError('')

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill all fields')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    if (register(formData)) {
      navigate('/login')
    } else {
      setError('Email already exists')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">🎓 Commerce Room</h1>
        <p className="text-center text-gray-600 mb-6">Create your account</p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
            <div className="flex items-center border border-gray-300 rounded px-3 py-2">
              <User size={18} className="text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="flex-1 ml-2 outline-none"
                placeholder="Enter your full name"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <div className="flex items-center border border-gray-300 rounded px-3 py-2">
              <Mail size={18} className="text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="flex-1 ml-2 outline-none"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Role</label>
            <div className="flex items-center border border-gray-300 rounded px-3 py-2">
              <Briefcase size={18} className="text-gray-400" />
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="flex-1 ml-2 outline-none"
              >
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
                <option value="student">Student</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <div className="flex items-center border border-gray-300 rounded px-3 py-2">
              <Lock size={18} className="text-gray-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="flex-1 ml-2 outline-none"
                placeholder="Enter password"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Confirm Password</label>
            <div className="flex items-center border border-gray-300 rounded px-3 py-2">
              <Lock size={18} className="text-gray-400" />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="flex-1 ml-2 outline-none"
                placeholder="Confirm password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
