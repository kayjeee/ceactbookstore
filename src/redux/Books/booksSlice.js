import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const BASE_URL = 'https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/bQBzRMehcR3M6emvw1S7';

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  try {
    const response = await axios.get(`${BASE_URL}/books`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch books');
  }
});

export const addBook = createAsyncThunk('books/addBook', async (book) => {
  const newBook = {
    item_id: uuidv4(),
    title: book.title,
    author: book.author,
    category: book.category,
  };

  try {
    const response = await axios.post(`${BASE_URL}/books`, newBook);
    return response.data;
  } catch (error) {
    throw new Error('Failed to add book');
  }
});

export const deleteBook = createAsyncThunk('books/deleteBook', async (id) => {
  try {
    await axios.delete(`${BASE_URL}/books/${id}`);
    return id;
  } catch (error) {
    throw new Error('Failed to delete book');
  }
});

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    booksList: {},
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
        state.booksList[action.payload.item_id] = action.payload;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        delete state.booksList[action.payload];
      });
  },
});

export const { actions } = booksSlice;
export default booksSlice.reducer;
