import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    addVote(state, action) {
      const id = action.payload;
      const quoteToChange = state.find((q) => q.id === id);
      const changedQuote = {
        ...quoteToChange,
        votes: quoteToChange.votes + 1,
      };
      return state.map((quote) => (quote.id !== id ? quote : changedQuote));
    },
    createQuote(state, action) {
      const content = action.payload;
      state.push(content);
    },
    appendAnecdotes(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const initialAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createQuote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdotes(newAnecdote));
  };
};

export const { addVote, appendAnecdotes, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
