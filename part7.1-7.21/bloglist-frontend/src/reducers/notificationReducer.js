import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      return (state = action.payload)
    },
  },
})

export const { setNotification } = notificationSlice.actions

export const updateNotification = (message, time) => {
  return async (dispatch) => {
    console.log(message)
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(setNotification(null))
    }, time * 1000)
  }
}

export default notificationSlice.reducer
