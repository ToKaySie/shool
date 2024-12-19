import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: JSON.parse(localStorage.getItem('notes') || '[]'),
  loading: false,
  error: null,
}

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action) => {
      const newNote = {
        id: Date.now().toString(),
        ...action.payload,
      }
      state.items.unshift(newNote)
      localStorage.setItem('notes', JSON.stringify(state.items))
    },
    deleteNote: (state, action) => {
      state.items = state.items.filter(note => note.id !== action.payload)
      localStorage.setItem('notes', JSON.stringify(state.items))
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
  },
})

export const { addNote, deleteNote, setLoading, setError } = notesSlice.actions
export default notesSlice.reducer
