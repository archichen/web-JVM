import React from 'react';
import logo from './logo.svg';
import { parse } from './fs/shell/shell';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <input onKeyPress={(e) => {
          if (e.nativeEvent.keyCode === 13) {
            parse(e.currentTarget.value);
          }
        }} placeholder='input command here...'/>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
