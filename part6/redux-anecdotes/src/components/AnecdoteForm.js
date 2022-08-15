import { useDispatch } from "react-redux";
import { createQuote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addQuote = async (event) => {
    event.preventDefault();
    const quote = event.target.quote.value;
    event.target.quote.value = "";
    dispatch(createQuote(quote));
    dispatch(showNotification(`you added '${quote}'`, 5));
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
