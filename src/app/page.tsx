"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Joke {
  _id: number;
  text: string;
  author: string;
}

export default function JokePage() {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    const fetchJokes = async () => {
      const response = await axios.get('/api/jokes');
      setJokes(response.data);
    };

    fetchJokes();
  }, []);

  const addJoke = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text || !author) return;

    const newJoke = { text, author };
    const response = await axios.post('/api/jokes', newJoke);
    setJokes((prev) => [...prev, response.data]);
    setText('');
    setAuthor('');
  };

  return (
    <div>
      <h1>Joke Collection</h1>
      <form onSubmit={addJoke}>
        <input
          type="text"
          placeholder="Enter joke text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <button type="submit">Add Joke</button>
      </form>
      <ul>
        {jokes.map((joke) => (
          <li key={joke._id}>
            <p>{joke.text}</p>
            <small>— {joke.author}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}