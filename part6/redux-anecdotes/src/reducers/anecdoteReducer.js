import { createSlice } from "@reduxjs/toolkit";
import initialState, { getId } from "./store";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
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
      state.push({
        content,
        id: getId(),
        votes: 0,
      });
    },
  },
});

export const { addVote, createQuote } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
