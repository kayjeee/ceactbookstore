import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooks } from '../redux/Books/booksSlice';
import BookForm from './BookForm';
import Book from './Book';
import '../App.css';

// Books component
const Books = () => {
  const thebooksList = useSelector((store) => store.books.booksList);
  const dispatch = useDispatch();
  const loading = useSelector((store) => store.books.loading);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="loadingcontainer">
        <div className="loader">
          <div className="loading" />
        </div>
      </div>
    );
  }

  const booksArray = Object.entries(thebooksList).map(([key, value]) => ({
    item_id: key,
    ...value[0],
  }));

  const booklist = booksArray.map((book) => (
    <Book booklListObject={book} key={book.item_id} />
  ));

  return (
    <div className="booksContainer">
      {booklist}
      <hr />
      <BookForm />
    </div>
  );
};

export default Books;
