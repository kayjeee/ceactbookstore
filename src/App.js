import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router, Route, Routes, Link,
} from 'react-router-dom';
import Home from './components/Home';
import './App.css';
import Categories from './components/Categories';
import store from './redux/store';

const App = () => (
  <Provider store={store}>
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
            <Route path="/categories" element={<Categories />} />
          </Routes>
        </div>
      </div>
    </Router>
  </Provider>
);

export default App;
