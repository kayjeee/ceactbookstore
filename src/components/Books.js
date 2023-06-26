import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { deleteBook, fetchBooks, addBook } from '../redux/Books/booksSlice';

import '../App.css';

// Book component
const Book = ({ booklListObject }) => {
  const dispatch = useDispatch();

  const handleDeleteBook = async (id) => {
    try {
      await dispatch(deleteBook(id));
      dispatch(fetchBooks());
    } catch (error) {
      // Handle error if needed
    }
  };

  return (
    <div className="book-card_container">
      <div className="book-info_container">
        <div className="main-info_container">
          <p className="category_container">{booklListObject.category}</p>
          <h1 className="title_container">{booklListObject.title}</h1>
          <h1 className="author_container">{booklListObject.author}</h1>
        </div>
        <ul className="buttons_container">
          <li className="buttonItemclass">
            <button
              type="button"
              className="button"
              onClick={() => {
                handleDeleteBook(booklListObject.item_id);
              }}
            >
              Remove
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

// PropTypes definition for Book component
Book.propTypes = {
  booklListObject: PropTypes.shape({
    category: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    item_id: PropTypes.string.isRequired,
  }).isRequired,
};

// BookForm component
const BookForm = () => {
  const categories = ['Action', 'Comdey', 'English', 'Maths'];
  const dispatch = useDispatch();

  const [book, setBook] = useState({
    title: '',
    author: '',
    category: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleBookChange = (e) => {
    setBook((prevBook) => ({
      ...prevBook,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDispatch = async (e) => {
    e.preventDefault();
    if (book.title && book.author && book.category) {
      await dispatch(addBook(book));
      setBook({ title: '', author: '', category: '' });
      await dispatch(fetchBooks());
      setSubmitted(true);
    }
  };

  const categoryOptions = categories.map((category) => (
    <option value={category} key={category}>
      {category}
    </option>
  ));

  return (
    <div>
      <p>ADD NEW BOOK</p>
      <form onSubmit={handleDispatch}>
        <input
          type="text"
          name="title"
          value={book.title}
          placeholder="Book title"
          onChange={handleBookChange}
        />
        <input
          type="text"
          name="author"
          value={book.author}
          placeholder="Book author"
          onChange={handleBookChange}
        />
        <select
          name="category"
          value={book.category}
          onChange={handleBookChange}
        >
          <option value="" disabled>
            Category
          </option>
          {categoryOptions}
        </select>
        <button type="submit">ADD BOOK</button>
      </form>

      {/* Show the book if submitted */}
      {submitted && <Book booklListObject={book} />}
    </div>
  );
};

// Books component
const Books = () => {
  const thebooksList = useSelector((store) => store.books.booksList);
  const loading = useSelector((store) => store.books.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="loader_container">
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
      <BookForm />
      <hr />
      {booklist}
    </div>
  );
};

export default Books;
