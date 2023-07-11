import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  user: null,
  status: 'idle',
  error: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = 'success'
        state.user = action.payload
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
})

export const { setUser } = userSlice.actions

export const getUser = createAsyncThunk(
  'user/getUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/login',
        credentials
      )
      return response.data
    } catch (err) {
      return rejectWithValue(err.response.data.error)
    }
  }
)

export default userSlice.reducer
