import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NewsFeed from './components/NewsFeed';

function App() {
  return (
    <div className="App bg-white" style={{ minHeight: '100vh' }}>
      <header className="bg-primary text-white py-4 mb-4 shadow-sm">
        <div className="container">
          <h1 className="mb-0">ShineNet News & Updates</h1>
          <p className="lead">Your personalized AI-powered news digest</p>
        </div>
      </header>
      <main>
        <NewsFeed />
      </main>
      <footer className="bg-dark text-white py-3 mt-4 text-center">
        © 2025 ShineNet. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
