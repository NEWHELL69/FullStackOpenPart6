/* eslint-disable react/prop-types */
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { updateAnecdote } from '../requests'
import { useNotificationDispatch } from '../notificationContex'

const AnecdoteList = ({ anecdotes }) => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  const newNoteMutation = useMutation(updateAnecdote, {
    onSuccess: (updatedAnecdote) => {
      const anecdotes = [...(queryClient.getQueryData({ queryKey: ["anecdotes"]}))]
      anecdotes.forEach(anecdote => {
        if(anecdote.id === updatedAnecdote.id){
          anecdote.votes = updatedAnecdote.votes
        }
      });
      queryClient.setQueryData({ queryKey: ['anecdotes'] }, anecdotes)
      notificationDispatch({type: 'SET', payload: `You voted "${updatedAnecdote.content}"`})
    }
  })

  const handleAnecdoteVoting = (anecdote) => {
    ++(anecdote.votes)
    newNoteMutation.mutate(anecdote)  
  }

    return (
      <div>
        {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => handleAnecdoteVoting(anecdote)}>vote</button>
                </div>
            </div>
        )}
      </div>
    )
  }
  
  export default AnecdoteList
  