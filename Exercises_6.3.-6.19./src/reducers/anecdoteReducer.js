import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService'
import { setNotification } from './notificationReducer'

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

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const result = await anecdoteService.createNew(content)
    dispatch(addAnecdote(result))
    dispatch(setNotification(`you created an anecdote: '${result.content}'`, 5));
  }
}

export const incrementAnecdoteVote = (anecdote) => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.vote(anecdote)
    dispatch(voteAnecdote(votedAnecdote.id))
    dispatch(setNotification(`you voted '${votedAnecdote.content}'`, 5))
  }
}    

export default anecdoteSlice.reducer