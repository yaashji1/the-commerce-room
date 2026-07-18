import { create } from 'zustand'

const useBroadcastStore = create((set) => ({
  broadcasts: JSON.parse(localStorage.getItem('broadcasts')) || [],
  
  addBroadcast: (broadcast) => {
    set((state) => {
      const newBroadcasts = [...state.broadcasts, { id: Date.now(), ...broadcast, createdAt: new Date().toISOString() }]
      localStorage.setItem('broadcasts', JSON.stringify(newBroadcasts))
      return { broadcasts: newBroadcasts }
    })
  },
  
  updateBroadcast: (id, updatedData) => {
    set((state) => {
      const newBroadcasts = state.broadcasts.map(b => b.id === id ? { ...b, ...updatedData } : b)
      localStorage.setItem('broadcasts', JSON.stringify(newBroadcasts))
      return { broadcasts: newBroadcasts }
    })
  },
  
  deleteBroadcast: (id) => {
    set((state) => {
      const newBroadcasts = state.broadcasts.filter(b => b.id !== id)
      localStorage.setItem('broadcasts', JSON.stringify(newBroadcasts))
      return { broadcasts: newBroadcasts }
    })
  },
  
  getBroadcastsByBatch: (batchId) => {
    return JSON.parse(localStorage.getItem('broadcasts'))?.filter(b => b.batchId === batchId) || []
  },
  
  getAllBroadcasts: () => {
    return JSON.parse(localStorage.getItem('broadcasts')) || []
  }
}))

export default useBroadcastStore
