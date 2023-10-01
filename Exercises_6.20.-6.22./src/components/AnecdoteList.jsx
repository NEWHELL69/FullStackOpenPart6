/* eslint-disable react/prop-types */
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { updateAnecdote } from '../requests'

const AnecdoteList = ({ anecdotes }) => {
  const queryClient = useQueryClient()

  const newNoteMutation = useMutation(updateAnecdote, {
    onSuccess: (updatedAnecdote) => {
      const anecdotes = [...(queryClient.getQueryData({ queryKey: ["anecdotes"]}))]
      anecdotes.forEach(anecdote => {
        if(anecdote.id === updatedAnecdote.id){
          anecdote.votes = updatedAnecdote.votes
        }
      });
      queryClient.setQueryData({ queryKey: ['anecdotes'] }, anecdotes)
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
  