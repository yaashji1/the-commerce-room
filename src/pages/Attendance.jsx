import { useState } from 'react'
import useAttendanceStore from '../store/attendanceStore'
import useStudentStore from '../store/studentStore'
import { Calendar, Check, X } from 'lucide-react'

const Attendance = () => {
  const students = useStudentStore((state) => state.students)
  const { markAttendance, getAttendanceByDate } = useAttendanceStore()
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [attendance, setAttendance] = useState({})

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value)
    const dayAttendance = getAttendanceByDate(e.target.value)
    const newAttendance = {}
    dayAttendance.forEach((a) => {
      newAttendance[a.studentId] = a.status
    })
    setAttendance(newAttendance)
  }

  const handleAttendanceChange = (studentId, status) => {
    setAttendance((prev) => ({ ...prev, [studentId]: status }))
    markAttendance(studentId, selectedDate, status)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Attendance Management</h1>

        {/* Date Selector */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center space-x-4">
            <Calendar size={24} className="text-blue-600" />
            <label className="font-semibold">Select Date:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="border border-gray-300 rounded px-4 py-2 outline-none"
            />
          </div>
        </div>

        {/* Attendance Table */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Student Name</th>
                <th className="px-4 py-3 text-left font-semibold">Email</th>
                <th className="px-4 py-3 text-center font-semibold">Present</th>
                <th className="px-4 py-3 text-center font-semibold">Absent</th>
                <th className="px-4 py-3 text-center font-semibold">Leave</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{student.name}</td>
                  <td className="px-4 py-3">{student.email}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleAttendanceChange(student.id, 'present')}
                      className={`p-2 rounded ${
                        attendance[student.id] === 'present'
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                      }`}
                    >
                      <Check size={20} />
                    </button>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleAttendanceChange(student.id, 'absent')}
                      className={`p-2 rounded ${
                        attendance[student.id] === 'absent'
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                      }`}
                    >
                      <X size={20} />
                    </button>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleAttendanceChange(student.id, 'leave')}
                      className={`p-2 rounded ${
                        attendance[student.id] === 'leave'
                          ? 'bg-yellow-500 text-white'
                          : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                      }`}
                    >
                      —
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {students.length === 0 && (
            <div className="p-6 text-center text-gray-500">No students to mark attendance</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Attendance
