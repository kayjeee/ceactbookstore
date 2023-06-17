import React, { useState, useEffect } from 'react';

const Books = () => {
  const [books, setBooks] = useState([]);

  const storeForm = (form) => {
    localStorage.setItem('form', JSON.stringify(form));
  };

  useEffect(() => {
    const storedForm = localStorage.getItem('form');
    const parsedBooks = storedForm ? JSON.parse(storedForm) : [];
    setBooks(parsedBooks);
  }, []);

  const addBook = (author, title) => {
    const newBook = { author, title };
    setBooks((prevBooks) => [...prevBooks, newBook]);
    storeForm([...books, newBook]);
  };

  const deleteBook = (index) => {
    const updatedBooks = books.filter((_, i) => i !== index);
    setBooks(updatedBooks);
    storeForm(updatedBooks);
  };

  const BookList = () => (
    <div>
      {books.map((book, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={index} className="tableRow">
          <div className="bookInfo">
            <div className="title">{book.title}</div>
            <div className="author">
              by
              {' '}
              {book.author}
            </div>
          </div>
          <div>
            <button onClick={() => deleteBook(index)} id={`delete${index}`} type="button">
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <BookList />
      <form id="addNewForm">
        <input type="text" id="bookTitle" placeholder="Title" />
        <input type="text" id="authorName" placeholder="Author" />
        <button
          onClick={(e) => {
            e.preventDefault();
            const newTitle = document.getElementById('bookTitle').value;
            const newAuthor = document.getElementById('authorName').value;
            if (newAuthor !== '' && newTitle !== '') {
              addBook(newAuthor, newTitle);
              document.getElementById('addNewForm').reset();
            }
          }}
          type="button"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default Books;
