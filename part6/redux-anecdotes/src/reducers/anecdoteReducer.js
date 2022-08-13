import { createSlice } from "@reduxjs/toolkit";
import { getId } from "./store";

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

export const { addVote, createQuote, appendAnecdotes, setAnecdotes } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
