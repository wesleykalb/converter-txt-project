import React from 'react';
import { FileConverter } from './components/FileConverter/FileConverter';
import './Home.styles.css';

export const HomePage = () => {
  return (
    <div className="home-container">
      <FileConverter />
    </div>
  );
};