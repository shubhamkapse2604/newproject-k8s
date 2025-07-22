import React, { useEffect, useState } from 'react';
import API_BASE_URL from './config';

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/books`)
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(err => console.error("API Error:", err));
  }, []);

  return (
    <div>
      <h1>Book List</h1>
      <ul>
        {books.map(book => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;