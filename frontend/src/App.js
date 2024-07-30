import React, { useState } from 'react';
import './App.css';

function App() {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/research', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keyword }),
      });
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>YouTube Video Idea Research Tool</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Enter a keyword"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Researching...' : 'Research'}
        </button>
      </form>
      {results && (
        <div>
          <h2>Top Performing Videos:</h2>
          <ul>
            {results.topVideos.map((video, index) => (
              <li key={index}>{video.title} - {video.views} views</li>
            ))}
          </ul>
          <h2>Suggested Topics:</h2>
          <ul>
            {results.suggestedTopics.map((topic, index) => (
              <li key={index}>{topic}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;