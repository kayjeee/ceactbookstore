import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { fetchBooks, addBook, deleteBook } from '../redux/Books/booksSlice';
import BookForm from './BookForm';

const Book = ({ objectFromBookList }) => {
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteBook(id));
      dispatch(fetchBooks());
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    const reloadBooks = async () => {
      await dispatch(fetchBooks());
    };

    reloadBooks();
  }, [dispatch]);

  return (
    <div>
      <div>
        <div>
          <p>{objectFromBookList.category}</p>
          <h1>{objectFromBookList.title}</h1>
          <span>{objectFromBookList.author}</span>
        </div>
        <ul>
          <li>
            <button type="button">
              Comment
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => {
                handleDelete(objectFromBookList.item_id);
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

Book.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  objectFromBookList: PropTypes.object.isRequired,
};

const Books = () => {
  const loading = useSelector((store) => store.books.loading);
  const booksList = useSelector((store) => store.books.booksList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleAddBook = () => {
    const newBook = {
      category: 'New_Category',
      title: 'New_Title',
      author: 'New_Author',
    };

    dispatch(addBook(newBook))
      .then(() => dispatch(fetchBooks()))
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  };

  if (loading) {
    return (
      <div className="loading_container_medium">
        <div className="loading_container_medium">
          <div className="loading_class" />
        </div>
      </div>
    );
  }

  const booksArrayList = Object.entries(booksList).map(([key, value]) => ({
    item_id: key,
    ...value[0],
  }));

  const bookListItems = booksArrayList.map((book) => (
    <Book objectFromBookList={book} key={book.item_id} />
  ));

  return (
    <div className="booksarraylistcontainer">
      {bookListItems}
      <hr />
      <div className="bookformcontainer">
        <BookForm />
        <button type="button" onClick={handleAddBook}>
          Add Book
        </button>
      </div>
    </div>
  );
};

export default Books;
