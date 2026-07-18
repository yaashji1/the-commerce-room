import { useState } from 'react'
import useTestStore from '../store/testStore'
import useBatchStore from '../store/batchStore'
import useStudentStore from '../store/studentStore'
import { Plus, Trash2, TrendingUp } from 'lucide-react'

const Tests = () => {
  const { tests, addTest, deleteTest, results, submitTestResult } = useTestStore()
  const batches = useBatchStore((state) => state.batches)
  const students = useStudentStore((state) => state.students)
  const [showForm, setShowForm] = useState(false)
  const [activeTab, setActiveTab] = useState('test')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    batchId: '',
    testDate: '',
    totalMarks: '',
    duration: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addTest(formData)
    setFormData({
      title: '',
      description: '',
      batchId: '',
      testDate: '',
      totalMarks: '',
      duration: '',
    })
    setShowForm(false)
  }

  const handleAddResult = (testId, studentId) => {
    const marks = prompt('Enter marks scored:')
    if (marks !== null) {
      submitTestResult({ testId, studentId, marks: parseInt(marks) })
    }
  }

  const getStudentResult = (testId, studentId) => {
    return results.find((r) => r.testId === testId && r.studentId === studentId)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Tests Management</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            <Plus size={20} />
            <span>Create Test</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('test')}
            className={`px-4 py-2 rounded font-semibold ${
              activeTab === 'test'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Tests
          </button>
          <button
            onClick={() => setActiveTab('results')}
            className={`px-4 py-2 rounded font-semibold ${
              activeTab === 'results'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Results
          </button>
        </div>

        {/* Add Test Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Create New Test</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="title"
                placeholder="Test Title"
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
                name="testDate"
                value={formData.testDate}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-3 py-2 outline-none"
              />
              <input
                type="number"
                name="totalMarks"
                placeholder="Total Marks"
                value={formData.totalMarks}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-3 py-2 outline-none"
              />
              <input
                type="number"
                name="duration"
                placeholder="Duration (minutes)"
                value={formData.duration}
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
                  Create Test
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

        {/* Tests Tab */}
        {activeTab === 'test' && (
          <div className="space-y-4">
            {tests.map((test) => (
              <div key={test.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{test.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{test.description}</p>
                  </div>
                  <button
                    onClick={() => deleteTest(test.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                  <p>
                    <span className="font-semibold">Batch:</span> {batches.find((b) => b.id == test.batchId)?.name}
                  </p>
                  <p>
                    <span className="font-semibold">Date:</span> {new Date(test.testDate).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-semibold">Total Marks:</span> {test.totalMarks}
                  </p>
                  <p>
                    <span className="font-semibold">Duration:</span> {test.duration} min
                  </p>
                </div>
              </div>
            ))}
            {tests.length === 0 && (
              <div className="text-center text-gray-500 py-12">No tests created yet</div>
            )}
          </div>
        )}

        {/* Results Tab */}
        {activeTab === 'results' && (
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Student</th>
                  <th className="px-4 py-3 text-left font-semibold">Test</th>
                  <th className="px-4 py-3 text-center font-semibold">Marks</th>
                  <th className="px-4 py-3 text-center font-semibold">Percentage</th>
                  <th className="px-4 py-3 text-center font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) =>
                  tests.map((test) => {
                    const result = getStudentResult(test.id, student.id)
                    const percentage = result ? ((result.marks / test.totalMarks) * 100).toFixed(2) : '-'
                    return (
                      <tr key={`${student.id}-${test.id}`} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3">{student.name}</td>
                        <td className="px-4 py-3">{test.title}</td>
                        <td className="px-4 py-3 text-center">
                          {result ? (
                            <span className="font-semibold text-blue-600">
                              {result.marks}/{test.totalMarks}
                            </span>
                          ) : (
                            <span className="text-gray-500">-</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {result ? (
                            <span
                              className={`font-semibold ${
                                percentage >= 60
                                  ? 'text-green-600'
                                  : percentage >= 40
                                  ? 'text-yellow-600'
                                  : 'text-red-600'
                              }`}
                            >
                              {percentage}%
                            </span>
                          ) : (
                            <span className="text-gray-500">-</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => handleAddResult(test.id, student.id)}
                            className="flex items-center justify-center space-x-1 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                          >
                            <TrendingUp size={16} />
                            <span>{result ? 'Update' : 'Add'}</span>
                          </button>
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

export default Tests
