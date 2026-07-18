import useAuthStore from '../store/authStore'
import useStudentStore from '../store/studentStore'
import useBatchStore from '../store/batchStore'
import useBroadcastStore from '../store/broadcastStore'
import { Users, BookOpen, Megaphone, BarChart3 } from 'lucide-react'

const Dashboard = () => {
  const user = useAuthStore((state) => state.user)
  const students = useStudentStore((state) => state.students)
  const batches = useBatchStore((state) => state.batches)
  const broadcasts = useBroadcastStore((state) => state.broadcasts)

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome, {user?.name}!</h1>
        <p className="text-gray-600 mb-8">Role: <span className="font-semibold capitalize">{user?.role}</span></p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Students</p>
                <p className="text-3xl font-bold text-blue-600">{students.length}</p>
              </div>
              <Users size={40} className="text-blue-400" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Batches</p>
                <p className="text-3xl font-bold text-green-600">{batches.length}</p>
              </div>
              <BookOpen size={40} className="text-green-400" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Announcements</p>
                <p className="text-3xl font-bold text-purple-600">{broadcasts.length}</p>
              </div>
              <Megaphone size={40} className="text-purple-400" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">System Status</p>
                <p className="text-3xl font-bold text-green-600">Active</p>
              </div>
              <BarChart3 size={40} className="text-green-400" />
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Students</h2>
            <div className="space-y-3">
              {students.slice(-5).reverse().map((student) => (
                <div key={student.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <p className="font-semibold text-gray-800">{student.name}</p>
                    <p className="text-sm text-gray-600">{student.email}</p>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                    {student.batchName}
                  </span>
                </div>
              ))}
              {students.length === 0 && <p className="text-gray-500">No students yet</p>}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Latest Announcements</h2>
            <div className="space-y-3">
              {broadcasts.slice(-5).reverse().map((broadcast) => (
                <div key={broadcast.id} className="p-3 bg-gray-50 rounded">
                  <p className="font-semibold text-gray-800">{broadcast.title}</p>
                  <p className="text-sm text-gray-600 line-clamp-2">{broadcast.message}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(broadcast.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
              {broadcasts.length === 0 && <p className="text-gray-500">No announcements yet</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
