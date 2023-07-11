import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  users: [],
  status: 'idle',
}

const allUsersSlice = createSlice({
  name: 'allUsers',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.status = 'success'
      state.users = action.payload
    })
  },
})

export const getAllUsers = createAsyncThunk(
  'allUsers/getAllUsers',
  async () => {
    const response = await axios.get('http://localhost:3000/api/users')
    console.log(response.data)
    return response.data
  }
)

export default allUsersSlice.reducer
