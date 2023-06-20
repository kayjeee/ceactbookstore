import { createSlice } from '@reduxjs/toolkit';

// Books Slice
const booksSlice = createSlice({
  name: 'books',
  initialState: [],
  reducers: {
    // Reducer to add a book
    addBook: (state, action) => {
      state.push(action.payload);
    },
    // Reducer to remove a book
    removeBook: (state, action) => state.filter((book) => book.id !== action.payload),
  },
});

export default booksSlice;
