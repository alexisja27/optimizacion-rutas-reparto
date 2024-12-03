// src/App.js
import React from 'react';
import MapContainer from './components/MapContainer';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>patgenie</h1>
      </header>
      <main className="App-main">
        <MapContainer />
      </main>
    </div>
  );
}

export default App;

