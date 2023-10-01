import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import AnecdoteList from './components/AnecdoteList'
import { useQuery } from '@tanstack/react-query'
import { getAnecdotes } from './requests'

const App = () => {

  const handleVote = (anecdote) => {
    console.log('vote')
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false
  })


  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if(result.isError) {
      console.log(result.error)
      return <div>Anecdote service not available due to problems in server</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification/>
      <AnecdoteForm/>
      <AnecdoteList anecdotes={result.data} />    
    </div>
  )
}

export default App
