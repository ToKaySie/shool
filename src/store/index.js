import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './themeSlice'
import notesReducer from './notesSlice'
import apiKeyReducer from './apiKeySlice'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    notes: notesReducer,
    apiKey: apiKeyReducer,
  },
})
