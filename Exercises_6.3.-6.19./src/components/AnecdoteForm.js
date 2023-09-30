import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const handleAddAnecdote = async (event) => {
        event.preventDefault();
        dispatch(createAnecdote(event.target.anecdote.value))
        event.target.anecdote.value = "";
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleAddAnecdote}>
                <input name="anecdote"/>
                <button>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm;