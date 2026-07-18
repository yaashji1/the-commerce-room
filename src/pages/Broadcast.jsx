import { useState } from 'react'
import useBroadcastStore from '../store/broadcastStore'
import useBatchStore from '../store/batchStore'
import { Plus, Trash2, Send, Megaphone } from 'lucide-react'

const Broadcast = () => {
  const { broadcasts, addBroadcast, deleteBroadcast } = useBroadcastStore()
  const batches = useBatchStore((state) => state.batches)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    batchId: 'all',
    priority: 'normal',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addBroadcast(formData)
    setFormData({
      title: '',
      message: '',
      batchId: 'all',
      priority: 'normal',
    })
    setShowForm(false)
  }

  const getPriorityBadgeColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700'
      case 'medium':
        return 'bg-yellow-100 text-yellow-700'
      default:
        return 'bg-blue-100 text-blue-700'
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Broadcast & Announcements</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            <Plus size={20} />
            <span>New Announcement</span>
          </button>
        </div>

        {/* Broadcast Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Create Announcement</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Announcement Title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 outline-none"
              />
              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 outline-none h-32"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  name="batchId"
                  value={formData.batchId}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded px-3 py-2 outline-none"
                >
                  <option value="all">All Batches</option>
                  {batches.map((batch) => (
                    <option key={batch.id} value={batch.id}>
                      {batch.name}
                    </option>
                  ))}
                </select>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded px-3 py-2 outline-none"
                >
                  <option value="normal">Normal Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
              </div>
              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="flex items-center space-x-2 flex-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  <Send size={18} />
                  <span>Send Announcement</span>
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

        {/* Announcements List */}
        <div className="space-y-4">
          {broadcasts.length > 0 ? (
            broadcasts
              .slice()
              .reverse()
              .map((broadcast) => (
                <div key={broadcast.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-3">
                      <Megaphone size={24} className="text-blue-600" />
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">{broadcast.title}</h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(broadcast.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteBroadcast(broadcast.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                  <p className="text-gray-700 mb-4 leading-relaxed whitespace-pre-wrap">{broadcast.message}</p>

                  <div className="flex flex-wrap gap-2 items-center">
                    <span className={`px-3 py-1 rounded text-xs font-semibold ${getPriorityBadgeColor(broadcast.priority)}`}>
                      {broadcast.priority.toUpperCase()}
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded">
                      {broadcast.batchId === 'all'
                        ? 'All Batches'
                        : batches.find((b) => b.id == broadcast.batchId)?.name || 'Unknown Batch'}
                    </span>
                  </div>
                </div>
              ))
          ) : (
            <div className="text-center text-gray-500 py-12 bg-white rounded-lg shadow">
              <Megaphone size={48} className="mx-auto mb-4 text-gray-300" />
              <p>No announcements yet. Create one to get started!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Broadcast
