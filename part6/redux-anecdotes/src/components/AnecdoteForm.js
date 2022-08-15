import { connect } from "react-redux";
import { createQuote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
  const addQuote = async (event) => {
    event.preventDefault();
    const quote = event.target.quote.value;
    event.target.quote.value = "";
    props.createQuote(quote);
    props.showNotification(`you added '${quote}'`, 5);
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

const mapDispatchToProps = {
  createQuote,
  showNotification,
};

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm);

export default ConnectedAnecdoteForm;
