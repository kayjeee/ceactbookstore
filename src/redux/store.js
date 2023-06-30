import { configureStore } from '@reduxjs/toolkit';
// import categoriesSlice from './Categories/categoriesSlice';
//  booksReducer, { fetchBooks } from './Books/booksSlice'; // Import fetchBooks as a named import
import categoriesReducer from './Categories/categoriesSlice'; // Import the categoriesSlice
import booksReducer, { fetchBooks } from './Books/booksSlice';

const store = configureStore({
  reducer: {
    books: booksReducer,
    categories: categoriesReducer, // Include the categoriesReducer
  },
});

export { fetchBooks }; // Export fetchBooks separately

export default store;
