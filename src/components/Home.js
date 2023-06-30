import React from 'react';
import Books from './Books';
import styles from '../styles/Home.module.css';

const Home = () => (
  <div>
    <div className={styles.home}>
      <Books />
    </div>
  </div>
);

export default Home;
