import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/api/news/?category=general') // update this URL as per your backend route
      .then(res => res.json())
      .then(data => {
        setNews(data.articles || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="container py-5" style={{ backgroundColor: '#fff8dc', minHeight: '100vh' }}>
      <header className="mb-5 text-center">
        <h1 className="display-4 text-primary">ShineNet News & Updates</h1>
        <p className="lead text-secondary">Your personalized AI-powered news digest</p>
      </header>

      <main>
        <section className="mb-4">
          <h2 className="text-danger">Latest Headlines</h2>
          {loading ? (
            <p>Loading news...</p>
          ) : (
            news.length > 0 ? (
              <div className="list-group">
                {news.map((article, index) => (
                  <a key={index} href={article.url} target="_blank" rel="noopener noreferrer" className="list-group-item list-group-item-action">
                    <h5>{article.title}</h5>
                    <p>{article.description}</p>
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-warning fs-5">No news available at the moment.</p>
            )
          )}
        </section>
      </main>

      <footer className="text-center mt-auto py-3 border-top" style={{ borderColor: '#ffcc00' }}>
        <small className="text-muted">© 2025 ShineNet. All rights reserved.</small>
      </footer>
    </div>
  );
}

export default App;
