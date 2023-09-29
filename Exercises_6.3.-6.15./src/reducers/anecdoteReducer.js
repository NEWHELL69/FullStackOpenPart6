import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    addAnecdote(state, action) {
      state.push(action.payload);
    },
    voteAnecdote(state, action) {
      state.map((anecdote) => {
        if(anecdote.id === action.payload) {
          anecdote.votes = anecdote.votes + 1;
        }

        return anecdote
      });
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const { addAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer