import { createSlice } from '@reduxjs/toolkit'

const initialState = 'A message';

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: {
      reducer(state, action) {
        return action.payload
      },
      prepare(...args){
        return {
          payload: {
            message: args[0],
            duration: args[1]
          }
        }
      }
    }
  },
})

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer