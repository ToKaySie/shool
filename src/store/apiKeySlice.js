import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  key: localStorage.getItem('geminiApiKey') || '',
  isValid: false,
}

export const apiKeySlice = createSlice({
  name: 'apiKey',
  initialState,
  reducers: {
    setApiKey: (state, action) => {
      state.key = action.payload
      localStorage.setItem('geminiApiKey', action.payload)
    },
    setKeyValidity: (state, action) => {
      state.isValid = action.payload
    },
    clearApiKey: (state) => {
      state.key = ''
      state.isValid = false
      localStorage.removeItem('geminiApiKey')
    }
  }
})

export const { setApiKey, setKeyValidity, clearApiKey } = apiKeySlice.actions
export default apiKeySlice.reducer
