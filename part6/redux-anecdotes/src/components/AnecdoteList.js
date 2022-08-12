import { useSelector, useDispatch } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import { showMessage } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const newAnecdotes = [...anecdotes];
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(addVote(id));
    const message = anecdotes.find((anecdote) => anecdote.id === id);
    dispatch(showMessage(`You voted '${message.content}'`));
    setTimeout(() => dispatch(showMessage("")), 5000);
  };

  return (
    <div>
      {newAnecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdoteList;
