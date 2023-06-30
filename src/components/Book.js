import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteBook, fetchBooks } from '../redux/Books/booksSlice';
import styles from '../styles/Book.module.css';

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
    <div className={styles.bookcardcontainer}>
      <div className={styles.bookinfocontainer}>
        <div className={styles.maininfocontainer}>
          <div className="Book_maininfocontainer__JPhJd">
            <p className="Book_categorycontainer__YmVid">{booklListObject.category}</p>
            <h2 className="Book_titlecontainer">{booklListObject.title}</h2>
            <h6 className="Book_authorcontainer">{booklListObject.author}</h6>
          </div>
          <ul className={styles.buttonscontainer}>
            <li>
              <button type="button" className={styles.button1}>
                Comment
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`${styles.button} ${styles.removeButton}`}
                onClick={() => {
                  handleDeleteBook(booklListObject.item_id);
                }}
              >
                Remove
              </button>
            </li>
            <li className="buttonItem">
              <button type="button" className={styles.button}>
                Edit
              </button>
            </li>
          </ul>
        </div>

        <div className={styles.currentChapter}>
          <p className={styles.currentChapterTitle}>Current Chapter</p>
          <p className={styles.chapter}>chapter 69</p>
          <button type="button" className={styles.progressButton}>
            UPDATE PROGRESS
          </button>
        </div>

        <div className={styles.completed}>
          <div className={styles.progressCercle} />
          <p className={styles.progressCompleted}>
            <span className={styles.percentage}>97%</span>
            <span className={styles.completedWord}>Completed</span>
          </p>
        </div>

      </div>
    </div>
  );
};

Book.propTypes = {
  booklListObject: PropTypes.shape({
    category: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    item_id: PropTypes.string.isRequired,
  }).isRequired,
};

export default Book;
