import { useSelector, useDispatch } from "react-redux";
import { increaseVote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const searchWord = useSelector((state) => state.filter);
  const anecdotesToShow = anecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(searchWord.toLowerCase())
  );
  const newAnecdotes = [...anecdotesToShow];
  const dispatch = useDispatch();

  const vote = async (id) => {
    const message = anecdotes.find((anecdote) => anecdote.id === id);
    const upVoteAnecedote = { ...message, votes: message.votes + 1 };
    dispatch(showNotification(`you voted '${message.content}'`, 5));
    dispatch(increaseVote(id, upVoteAnecedote));
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
