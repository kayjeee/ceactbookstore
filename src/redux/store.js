import { configureStore } from '@reduxjs/toolkit';
import booksSlice from './Books/booksSlice';
import categoriesSlice from './Categories/categoriesSlice';

// Configure Redux Store
const store = configureStore({
  reducer: {
    books: booksSlice.reducer,
    categories: categoriesSlice.reducer,
  },
});

export default store;
