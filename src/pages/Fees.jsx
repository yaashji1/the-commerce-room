import { useState } from 'react'
import useFeeStore from '../store/feeStore'
import useStudentStore from '../store/studentStore'
import { Plus, Trash2, DollarSign } from 'lucide-react'

const Fees = () => {
  const students = useStudentStore((state) => state.students)
  const { fees, addFeeRecord, deleteFeeRecord } = useFeeStore()
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    studentId: '',
    studentName: '',
    amount: '',
    dueDate: '',
    status: 'pending',
    description: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (name === 'studentId') {
      const student = students.find((s) => s.id == value)
      setFormData((prev) => ({ ...prev, studentName: student?.name || '' }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addFeeRecord(formData)
    setFormData({
      studentId: '',
      studentName: '',
      amount: '',
      dueDate: '',
      status: 'pending',
      description: '',
    })
    setShowForm(false)
  }

  const studentFees = fees.reduce((acc, fee) => {
    const studentId = fee.studentId
    if (!acc[studentId]) {
      acc[studentId] = []
    }
    acc[studentId].push(fee)
    return acc
  }, {})

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Fees Management</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            <Plus size={20} />
            <span>Add Fee Record</span>
          </button>
        </div>

        {/* Add Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Add Fee Record</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                name="studentId"
                value={formData.studentId}
                onChange={handleInputChange}
                required
                className="border border-gray-300 rounded px-3 py-2 outline-none"
              >
                <option value="">Select Student</option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={formData.amount}
                onChange={handleInputChange}
                required
                className="border border-gray-300 rounded px-3 py-2 outline-none"
              />
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-3 py-2 outline-none"
              />
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-3 py-2 outline-none"
              >
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="overdue">Overdue</option>
              </select>
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleInputChange}
                className="md:col-span-2 border border-gray-300 rounded px-3 py-2 outline-none"
              />
              <div className="md:col-span-2 flex space-x-2">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Add Record
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

        {/* Fee Records by Student */}
        <div className="space-y-6">
          {students.map((student) => {
            const studentRecords = studentFees[student.id] || []
            return (
              <div key={student.id} className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                  <DollarSign size={20} className="text-blue-600" />
                  <span>{student.name}</span>
                </h3>
                {studentRecords.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-3 py-2 text-left">Amount</th>
                          <th className="px-3 py-2 text-left">Due Date</th>
                          <th className="px-3 py-2 text-left">Status</th>
                          <th className="px-3 py-2 text-left">Description</th>
                          <th className="px-3 py-2 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {studentRecords.map((record) => (
                          <tr key={record.id} className="border-b hover:bg-gray-50">
                            <td className="px-3 py-2">₹{record.amount}</td>
                            <td className="px-3 py-2">{new Date(record.dueDate).toLocaleDateString()}</td>
                            <td className="px-3 py-2">
                              <span
                                className={`px-3 py-1 rounded text-xs font-semibold ${
                                  record.status === 'paid'
                                    ? 'bg-green-100 text-green-700'
                                    : record.status === 'overdue'
                                    ? 'bg-red-100 text-red-700'
                                    : 'bg-yellow-100 text-yellow-700'
                                }`}
                              >
                                {record.status.toUpperCase()}
                              </span>
                            </td>
                            <td className="px-3 py-2">{record.description}</td>
                            <td className="px-3 py-2 text-center">
                              <button
                                onClick={() => deleteFeeRecord(record.id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No fee records</p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Fees
