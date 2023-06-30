import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBook, fetchBooks } from '../redux/Books/booksSlice';
import styles from '../styles/BookForm.module.css';
import Book from './Book';

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
    <div className={styles.formContainer}>
      <p className={styles.formTitle}>ADD NEW BOOK</p>
      <form className={styles.form} onSubmit={handleDispatch}>
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

export default BookForm;
