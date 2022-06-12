import React, { useState } from "react";

const Display = ({ anecdotes, selected, points }) => {
  return (
    <div>
      <div>{anecdotes[selected]}</div>
      <div>has {points[selected]} votes</div>
    </div>
  );
};

const MaxDisplay = ({ anecdotes, points }) => {
  let max = 0;
  let index = 0;

  for (let i = 0; i < points.length; i++) {
    if (points[i] > max) {
      max = points[i];
      index = i;
    };
  };

  return (
    <div>
      <div>{anecdotes[index]}</div>
      <div>has {max} votes</div>
    </div>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));

  const handleNextAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };
  const handleUpVote = () => {
    const newPoints = [...points];
    newPoints[selected] += 1;
    setPoints(newPoints);
  };
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Display anecdotes={anecdotes} selected={selected} points={points} />
      <button onClick={handleUpVote}>vote</button>
      <button onClick={handleNextAnecdote}>next anecdotes</button>

      <h1>Anecdote with most votes</h1>
      <MaxDisplay anecdotes={anecdotes} points={points} />
    </div>
  );
};

export default App;
