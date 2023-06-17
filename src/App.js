import React from 'react';
import {
  BrowserRouter as Router, Route, Routes, Link,
} from 'react-router-dom';
import Home from './components/Home';
import QuoteDisplay from './components/QouteDisplay';
import './App.css';
import Categories from './components/Categories';

const App = () => (
  <Router>
    <div>
      <div className="nav-container">
        <nav>
          <h1>
            <Link to="https://github.com/kayjeee/Micro_Verse_React_Maths_Mathematician_App_v2">
              Micro_Verse_React_Maths_Mathematician_App_v2
            </Link>
            <span className="heart-sticker" role="img" aria-label="heart">❤️</span>
          </h1>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/quote">Quote</Link></li>
            <li><Link to="/categories">categories</Link></li>
          </ul>
        </nav>
      </div>

      <div className="content-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quote" element={<QuoteDisplay />} />
          <Route path="/categories" element={<Categories />} />
        </Routes>
      </div>
    </div>
  </Router>
);

export default App;
