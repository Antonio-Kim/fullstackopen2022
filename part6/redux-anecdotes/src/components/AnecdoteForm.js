import { useDispatch } from "react-redux";
import { createQuote } from "../reducers/anecdoteReducer";
import anecdoteService from "../services/anecdotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addQuote = async (event) => {
    event.preventDefault();
    const quote = event.target.quote.value;
    event.target.quote.value = "";
    const newAnecdote = await anecdoteService.createNew(quote);
    dispatch(createQuote(newAnecdote));
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addQuote}>
        <div>
          <input name="quote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
