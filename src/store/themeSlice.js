import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode
    },
  },
})

export const { toggleTheme } = themeSlice.actions
export default themeSlice.reducer