import React, { useState, useEffect } from 'react';

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const storedForm = localStorage.getItem('form');
    const parsedBooks = storedForm ? JSON.parse(storedForm) : [];
    setBooks(parsedBooks);
  }, []);

  const addBook = (author, title) => {
    const newBook = { author, title };
    setBooks([...books, newBook]);
    storeForm([...books, newBook]);
  };

  const deleteBook = (index) => {
    const updatedBooks = books.filter((_, i) => i !== index);
    setBooks(updatedBooks);
    storeForm(updatedBooks);
  };

  const storeForm = (form) => {
    localStorage.setItem('form', JSON.stringify(form));
  };

  const BookList = () => (
    <div>
      {books.map((book, index) => (
        <div key={index} className="tableRow">
          <div className="bookInfo">
            <div className="title">{book.title}</div>
            <div className="author">
              by
              {book.author}
            </div>
          </div>
          <div>
            <button onClick={() => deleteBook(index)} id={`delete${index}`}>
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
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default Books;
