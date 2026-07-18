import { useState } from 'react'
import useHomeworkStore from '../store/homeworkStore'
import useBatchStore from '../store/batchStore'
import useStudentStore from '../store/studentStore'
import { Plus, Trash2, CheckCircle } from 'lucide-react'

const Homework = () => {
  const { homework, addHomework, deleteHomework, submissions, submitHomework } = useHomeworkStore()
  const batches = useBatchStore((state) => state.batches)
  const students = useStudentStore((state) => state.students)
  const [showForm, setShowForm] = useState(false)
  const [activeTab, setActiveTab] = useState('assignment')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    batchId: '',
    dueDate: '',
    maxMarks: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addHomework(formData)
    setFormData({
      title: '',
      description: '',
      batchId: '',
      dueDate: '',
      maxMarks: '',
    })
    setShowForm(false)
  }

  const handleSubmitHomework = (hwId, studentId) => {
    submitHomework({ homeworkId: hwId, studentId, marks: 0 })
  }

  const getSubmissionStatus = (hwId, studentId) => {
    return submissions.find((s) => s.homeworkId === hwId && s.studentId === studentId)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Homework Management</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            <Plus size={20} />
            <span>Assign Homework</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('assignment')}
            className={`px-4 py-2 rounded font-semibold ${
              activeTab === 'assignment'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Assignments
          </button>
          <button
            onClick={() => setActiveTab('submission')}
            className={`px-4 py-2 rounded font-semibold ${
              activeTab === 'submission'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Submissions
          </button>
        </div>

        {/* Add Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Assign Homework</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="border border-gray-300 rounded px-3 py-2 outline-none"
              />
              <select
                name="batchId"
                value={formData.batchId}
                onChange={handleInputChange}
                required
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
                name="dueDate"
                value={formData.dueDate}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-3 py-2 outline-none"
              />
              <input
                type="number"
                name="maxMarks"
                placeholder="Max Marks"
                value={formData.maxMarks}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-3 py-2 outline-none"
              />
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleInputChange}
                className="md:col-span-2 border border-gray-300 rounded px-3 py-2 outline-none h-24"
              />
              <div className="md:col-span-2 flex space-x-2">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Assign
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

        {/* Assignments Tab */}
        {activeTab === 'assignment' && (
          <div className="space-y-4">
            {homework.map((hw) => (
              <div key={hw.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{hw.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{hw.description}</p>
                  </div>
                  <button
                    onClick={() => deleteHomework(hw.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                  <p>
                    <span className="font-semibold">Batch:</span> {batches.find((b) => b.id == hw.batchId)?.name}
                  </p>
                  <p>
                    <span className="font-semibold">Due Date:</span> {new Date(hw.dueDate).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-semibold">Max Marks:</span> {hw.maxMarks}
                  </p>
                </div>
              </div>
            ))}
            {homework.length === 0 && (
              <div className="text-center text-gray-500 py-12">No homework assigned yet</div>
            )}
          </div>
        )}

        {/* Submissions Tab */}
        {activeTab === 'submission' && (
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Student</th>
                  <th className="px-4 py-3 text-left font-semibold">Homework</th>
                  <th className="px-4 py-3 text-left font-semibold">Status</th>
                  <th className="px-4 py-3 text-center font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) =>
                  homework.map((hw) => {
                    const submitted = getSubmissionStatus(hw.id, student.id)
                    return (
                      <tr key={`${student.id}-${hw.id}`} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3">{student.name}</td>
                        <td className="px-4 py-3">{hw.title}</td>
                        <td className="px-4 py-3">
                          {submitted ? (
                            <span className="flex items-center space-x-1 text-green-600">
                              <CheckCircle size={16} />
                              <span>Submitted</span>
                            </span>
                          ) : (
                            <span className="text-gray-500">Pending</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {!submitted && (
                            <button
                              onClick={() => handleSubmitHomework(hw.id, student.id)}
                              className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                            >
                              Mark Done
                            </button>
                          )}
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Homework
