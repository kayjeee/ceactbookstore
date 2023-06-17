import React from 'react';

function NewBookForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Book title" />
      <button type="submit">Add Book</button>
    </form>
  );
}

export default NewBookForm;
