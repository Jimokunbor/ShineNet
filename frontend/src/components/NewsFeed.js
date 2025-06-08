import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NewsFeed = () => {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState('technology');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/news?category=${category}`);
      if (response.data.articles) {
        setNews(response.data.articles);
      } else {
        setNews([]);
      }
    } catch (err) {
      setError('Failed to fetch news. Please try again later.');
      setNews([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, [category]);

  return (
    <div className="container my-4 p-4 border rounded shadow-sm bg-light">
      <h2 className="text-primary mb-3">Latest News in {category.charAt(0).toUpperCase() + category.slice(1)}</h2>

      <select
        className="form-select mb-3"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        aria-label="Select news category"
      >
        <option value="general">General</option>
        <option value="technology">Technology</option>
        <option value="business">Business</option>
        <option value="sports">Sports</option>
        <option value="science">Science</option>
        <option value="health">Health</option>
        <option value="entertainment">Entertainment</option>
      </select>

      {loading && <p>Loading news...</p>}
      {error && <p className="text-danger">{error}</p>}

      {!loading && !error && news.length === 0 && <p>No news available at the moment.</p>}

      <div className="list-group">
        {news.map((article, index) => (
          <a
            key={index}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="list-group-item list-group-item-action mb-2"
          >
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{article.title}</h5>
              <small>{new Date(article.publishedAt).toLocaleDateString()}</small>
            </div>
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                alt={article.title}
                className="img-fluid rounded mb-2"
                style={{ maxHeight: '200px', objectFit: 'cover' }}
              />
            )}
            <p className="mb-1">{article.description}</p>
            <small className="text-muted">Source: {article.source.name}</small>
          </a>
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;
