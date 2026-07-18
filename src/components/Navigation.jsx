import { useState } from 'react'
import { Link } from 'react-router-dom'
import useAuthStore from '../store/authStore'
import { Menu, X, LogOut } from 'lucide-react'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuthStore()

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Students', path: '/students' },
    { name: 'Attendance', path: '/attendance' },
    { name: 'Fees', path: '/fees' },
    { name: 'Batches', path: '/batches' },
    { name: 'Homework', path: '/homework' },
    { name: 'Tests', path: '/tests' },
    { name: 'Broadcast', path: '/broadcast' },
  ]

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/dashboard" className="text-2xl font-bold">
            🎓 Commerce Room
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="hover:bg-blue-700 px-3 py-2 rounded transition"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* User Info & Logout */}
          <div className="hidden md:flex items-center space-x-4">
            <span className="text-sm">{user?.name}</span>
            <button
              onClick={logout}
              className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-3 py-2 rounded transition"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="block hover:bg-blue-700 px-3 py-2 rounded transition"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <button
              onClick={() => {
                logout()
                setIsOpen(false)
              }}
              className="w-full flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-3 py-2 rounded transition"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation
