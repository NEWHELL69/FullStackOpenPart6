import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer';

const sortAnecdotes = (anecdotes) => {
    return anecdotes.toSorted((a, b) => a.votes > b.votes ? -1 : 1);
}

const filterAnecdotes = (anecdotes, filter) => {
    return anecdotes.filter((anecdote) => {
        if(anecdote.content.toLowerCase().includes(filter)) {
            return true
        }

        return false;
    })
}

const AnecdoteList = () => {
    const anecdotes = useSelector(state => sortAnecdotes(filterAnecdotes(state.anecdotes, state.filter)))
    const dispatch = useDispatch()

    const handleAnecdoteVoting = (anecdote) => {
        dispatch(voteAnecdote(anecdote.id))
        dispatch(setNotification(`you voted '${anecdote.content}'`))
    }    

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                        <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleAnecdoteVoting(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList;