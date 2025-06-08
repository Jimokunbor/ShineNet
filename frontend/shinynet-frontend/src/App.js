import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState("general");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch news on category or search change
  useEffect(() => {
    setLoading(true);
    setError(null);

    // Build API URL with category and search params
    let url = `/api/news/?category=${category}`;
    if (search.trim() !== "") {
      url += `&search=${encodeURIComponent(search.trim())}`;
    }

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch news");
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
  }, [category, search]);

  return (
    <div className="container mt-4">
      <header className="mb-4">
        <h1 className="text-primary">ShineNet News & Updates</h1>
        <p className="text-muted">Your personalized AI-powered news digest</p>
      </header>

      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="categorySelect" className="form-label">
            Select News Category
          </label>
          <select
            id="categorySelect"
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {/* Add all categories here */}
            <option value="general">General</option>
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
            {/* Add more categories as needed */}
          </select>
        </div>

        <div className="col-md-6">
          <label htmlFor="searchInput" className="form-label">
            Search News
          </label>
          <input
            id="searchInput"
            type="text"
            className="form-control"
            placeholder="Search news by keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading && <p>Loading news...</p>}
      {error && <p className="text-danger">Error: {error}</p>}

      <div className="row">
        {news.length === 0 && !loading && <p>No news available at the moment.</p>}

        {news.map((article, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card h-100 shadow-sm">
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  className="card-img-top"
                  alt={article.title}
                  style={{ maxHeight: "200px", objectFit: "cover" }}
                />
              )}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text">{article.description}</p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto btn btn-primary"
                >
                  Read More
                </a>
              </div>
              <div className="card-footer text-muted small">
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
