import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBook, fetchBooks } from '../redux/Books/booksSlice';

const BookForm = () => {
  const categories = ['Action', 'ScienceFiction', 'Maths', 'Economy'];
  const dispatch = useDispatch();

  // Create category options for the select dropdown
  const categoryOptions = categories.map((category, key) => (
    // eslint-disable-next-line react/no-array-index-key
    <option value={category} key={key}>
      {category}
    </option>
  ));

  // Initialize state for the book form inputs
  const [book, setBook] = useState({
    title: '',
    author: '',
    category: '',
  });

  // Handle input changes and update the book state
  const handleChange = (e) => {
    setBook((prevBook) => ({
      ...prevBook,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle book form submission
  const handleDispatch = async (e) => {
    e.preventDefault();
    const { title, author, category } = book;

    // Check if any input field is empty
    if (title.trim() !== '' && author.trim() !== '' && category.trim() !== '') {
      try {
        // Dispatch addBook action to add a new book
        await dispatch(addBook(book));

        // Fetch updated book list after adding the book
        dispatch(fetchBooks());

        // Clear the form inputs
        setBook({ title: '', author: '', category: '' });
      } catch (error) {
        // Handle error here
        // console.log(error);
      }
    }
  };

  return (
    <div>
      <p>ADD NEW BOOK</p>
      <form>
        <input
          type="text"
          name="title"
          value={book.title}
          placeholder="Book title"
          onChange={handleChange}
        />
        <input
          type="text"
          name="author"
          value={book.author}
          placeholder="Book author"
          onChange={handleChange}
        />
        <select
          name="category"
          value={book.category}
          onChange={handleChange}
        >
          <option value="" disabled>
            Category
          </option>
          {categoryOptions}
        </select>
        <button type="submit" onClick={handleDispatch}>
          ADD BOOK
        </button>
      </form>
    </div>
  );
};

export default BookForm;
