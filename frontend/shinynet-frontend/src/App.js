import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState('general');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch news from backend API when component mounts or category changes
  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`/api/news/?category=${category}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch news');
        return res.json();
      })
      .then((data) => {
        setNews(data.articles || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [category]);

  return (
    <div className="container my-5" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <header className="mb-4 text-center">
        <h1 className="display-4 text-primary fw-bold">ShineNet News & Updates</h1>
        <p className="lead text-secondary">Your personalized AI-powered news digest</p>
      </header>

      <div className="mb-4">
        <label htmlFor="categorySelect" className="form-label fw-semibold" style={{ fontSize: '1.1rem' }}>
          Select News Category
        </label>
        <select
          id="categorySelect"
          className="form-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="sport">Sport</option>
          <option value="comedy">Comedy</option>
          <option value="politics">Politics</option>
          <option value="business">Business</option>
          <option value="entertainment">Entertainment</option>
          <option value="technology">Technology</option>
          <option value="health">Health</option>
          <option value="science">Science</option>
          <option value="world">World</option>
          <option value="local">Local</option>
          <option value="weather">Weather</option>
          <option value="crime">Crime</option>
          <option value="education">Education</option>
          <option value="environment">Environment</option>
          <option value="lifestyle">Lifestyle</option>
          <option value="opinion">Opinion</option>
          <option value="travel">Travel</option>
          <option value="culture">Culture</option>
          <option value="editorials">Editorials</option>
          {/* Add other categories as needed */}
        </select>
      </div>

      {loading && (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status" aria-hidden="true"></div>
          <span className="ms-2">Loading news...</span>
        </div>
      )}

      {error && <p className="text-danger text-center fw-semibold">{error}</p>}

      {!loading && news.length === 0 && !error && (
        <p className="text-center text-muted fs-5">No news available at the moment.</p>
      )}

      <div className="row g-4">
        {news.map((article, index) => (
          <div className="col-md-4" key={index}>
            <div className="card h-100 shadow-sm">
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  className="card-img-top"
                  alt={article.title}
                  style={{ objectFit: 'cover', height: '180px' }}
                />
              )}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold" style={{ minHeight: '3rem' }}>{article.title}</h5>
                <p className="card-text flex-grow-1">{article.description}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-auto">
                  Read More
                </a>
              </div>
              <div className="card-footer text-muted fst-italic" style={{ fontSize: '0.8rem' }}>
                {new Date(article.publishedAt).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      <footer className="text-center mt-5 mb-3 text-muted">
        &copy; 2025 ShineNet. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
