import { useState } from 'react'
import useBatchStore from '../store/batchStore'
import { Plus, Trash2, Edit2 } from 'lucide-react'

const Batches = () => {
  const { batches, addBatch, updateBatch, deleteBatch } = useBatchStore()
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    startTime: '',
    endTime: '',
    days: '',
    capacity: '',
    fees: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editId) {
      updateBatch(editId, formData)
      setEditId(null)
    } else {
      addBatch(formData)
    }
    setFormData({
      name: '',
      subject: '',
      startTime: '',
      endTime: '',
      days: '',
      capacity: '',
      fees: '',
    })
    setShowForm(false)
  }

  const handleEdit = (batch) => {
    setFormData(batch)
    setEditId(batch.id)
    setShowForm(true)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Batches Management</h1>
          <button
            onClick={() => {
              setShowForm(!showForm)
              setEditId(null)
              setFormData({
                name: '',
                subject: '',
                startTime: '',
                endTime: '',
                days: '',
                capacity: '',
                fees: '',
              })
            }}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            <Plus size={20} />
            <span>Add Batch</span>
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">{editId ? 'Edit Batch' : 'Add New Batch'}</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Batch Name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="border border-gray-300 rounded px-3 py-2 outline-none"
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-3 py-2 outline-none"
              />
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-3 py-2 outline-none"
              />
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-3 py-2 outline-none"
              />
              <input
                type="text"
                name="days"
                placeholder="Days (e.g., Mon, Wed, Fri)"
                value={formData.days}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-3 py-2 outline-none"
              />
              <input
                type="number"
                name="capacity"
                placeholder="Capacity"
                value={formData.capacity}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-3 py-2 outline-none"
              />
              <input
                type="number"
                name="fees"
                placeholder="Fees"
                value={formData.fees}
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

        {/* Batches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {batches.map((batch) => (
            <div key={batch.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
              <h3 className="text-lg font-bold text-gray-800 mb-2">{batch.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{batch.subject}</p>
              <div className="space-y-2 text-sm text-gray-700 mb-4">
                <p>
                  <span className="font-semibold">Time:</span> {batch.startTime} - {batch.endTime}
                </p>
                <p>
                  <span className="font-semibold">Days:</span> {batch.days}
                </p>
                <p>
                  <span className="font-semibold">Capacity:</span> {batch.capacity}
                </p>
                <p>
                  <span className="font-semibold">Fees:</span> ₹{batch.fees}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(batch)}
                  className="flex-1 flex items-center justify-center space-x-1 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 text-sm"
                >
                  <Edit2 size={16} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => deleteBatch(batch.id)}
                  className="flex-1 flex items-center justify-center space-x-1 bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 text-sm"
                >
                  <Trash2 size={16} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
        {batches.length === 0 && (
          <div className="text-center text-gray-500 py-12">No batches created yet</div>
        )}
      </div>
    </div>
  )
}

export default Batches
