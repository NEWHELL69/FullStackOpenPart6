import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer';
import anecdoteService from '../services/anecdoteService'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const handleAddAnecdote = async (event) => {
        event.preventDefault();
        const result = await anecdoteService.createNew(event.target.anecdote.value)
        dispatch(addAnecdote(result))
        dispatch(setNotification(`you created an anecdote: '${event.target.anecdote.value}'`));
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