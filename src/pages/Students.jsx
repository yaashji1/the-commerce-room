import { useState } from 'react'
import useStudentStore from '../store/studentStore'
import useBatchStore from '../store/batchStore'
import { Plus, Trash2, Edit2, Search } from 'lucide-react'

const Students = () => {
  const { students, addStudent, updateStudent, deleteStudent } = useStudentStore()
  const batches = useBatchStore((state) => state.batches)
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    batchId: '',
    batchName: '',
    enrollmentDate: new Date().toISOString().split('T')[0],
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (name === 'batchId') {
      const batch = batches.find(b => b.id == value)
      setFormData((prev) => ({ ...prev, batchName: batch?.name || '' }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editId) {
      updateStudent(editId, formData)
      setEditId(null)
    } else {
      addStudent(formData)
    }
    setFormData({
      name: '',
      email: '',
      phone: '',
      batchId: '',
      batchName: '',
      enrollmentDate: new Date().toISOString().split('T')[0],
    })
    setShowForm(false)
  }

  const handleEdit = (student) => {
    setFormData(student)
    setEditId(student.id)
    setShowForm(true)
  }

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Students Management</h1>
          <button
            onClick={() => {
              setShowForm(!showForm)
              setEditId(null)
              setFormData({
                name: '',
                email: '',
                phone: '',
                batchId: '',
                batchName: '',
                enrollmentDate: new Date().toISOString().split('T')[0],
              })
            }}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            <Plus size={20} />
            <span>Add Student</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="flex items-center bg-white rounded shadow px-4 py-2">
            <Search size={20} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 ml-2 outline-none"
            />
          </div>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">{editId ? 'Edit Student' : 'Add New Student'}</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Student Name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="border border-gray-300 rounded px-3 py-2 outline-none"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="border border-gray-300 rounded px-3 py-2 outline-none"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-3 py-2 outline-none"
              />
              <select
                name="batchId"
                value={formData.batchId}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-3 py-2 outline-none"
              >
                <option value="">Select Batch</option>
                {batches.map((batch) => (
                  <option key={batch.id} value={batch.id}>
                    {batch.name}
                  </option>
                ))}
              </select>
              <input
                type="date"
                name="enrollmentDate"
                value={formData.enrollmentDate}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-3 py-2 outline-none"
              />
              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  {editId ? 'Update' : 'Add'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Students Table */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Name</th>
                <th className="px-4 py-3 text-left font-semibold">Email</th>
                <th className="px-4 py-3 text-left font-semibold">Phone</th>
                <th className="px-4 py-3 text-left font-semibold">Batch</th>
                <th className="px-4 py-3 text-left font-semibold">Enrollment Date</th>
                <th className="px-4 py-3 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{student.name}</td>
                  <td className="px-4 py-3">{student.email}</td>
                  <td className="px-4 py-3">{student.phone}</td>
                  <td className="px-4 py-3">{student.batchName}</td>
                  <td className="px-4 py-3">{new Date(student.enrollmentDate).toLocaleDateString()}</td>
                  <td className="px-4 py-3 flex space-x-2">
                    <button
                      onClick={() => handleEdit(student)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => deleteStudent(student.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredStudents.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              No students found
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Students
