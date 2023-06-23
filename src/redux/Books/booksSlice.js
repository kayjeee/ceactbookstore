import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const BASE_URL = 'https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/bQBzRMehcR3M6emvw1S7';

// Async thunk for fetching books from the Bookstore API
export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const response = await axios.get(`${BASE_URL}/books`);
  return response.data;
});

// Async thunk for adding a book using the Bookstore API
export const addBook = createAsyncThunk('books/addBook', async (bookInfo) => {
  const newBook = {
    item_id: uuidv4(),
    author: bookInfo[1],
    title: bookInfo[0],
    category: bookInfo[2],
  };
  try {
    const resp = await axios.post(`${BASE_URL}/books`, newBook);
    return resp.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// Async thunk for deleting a book using the Bookstore API
// Async thunk for deleting a book using the Bookstore API
export const deleteBook = createAsyncThunk('books/deleteBook', async (id) => {
  await axios.delete(`${BASE_URL}/books/${id}`);
  return id;
});

// Redux slice for books
const booksSlice = createSlice({
  name: 'books',
  initialState: {
    books_List: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.booksList = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.booksList.push(action.payload);
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.booksList = state.booksList.filter((book) => book.item_id !== action.payload);
      });
  },
});

export default booksSlice.reducer;
