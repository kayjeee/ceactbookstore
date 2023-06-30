import React from 'react';
import { IoMdContact } from 'react-icons/io';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router, Route, Routes, NavLink,
} from 'react-router-dom';
import Home from './components/Home';
import './App.css';
import Categories from './components/Categories';
import store from './redux/store';
import styles from './styles/Navbar.module.css';

const links = [
  { path: '/', text: 'Books' },
  { path: '/categories', text: 'Categories' },
];

const App = () => (
  <Provider store={store}>
    <Router>
      <div className="nav-container">
        <nav className={styles.navbar}>
          <div className={styles.links}>
            <span className={styles.title}>Bookstore CMS1o</span>
            <ul className={styles.navList}>
              {links.map((link) => (
                <li key={link.text}>
                  <NavLink
                    to={link.path}
                    className={styles.navLink}
                    activeClassName={styles.active}
                  >
                    {link.text}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <IoMdContact className={styles.icon} />
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
        </Routes>
      </div>
    </Router>
  </Provider>
);

export default App;
