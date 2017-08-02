import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import UploadPhoto from './UploadPhoto';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div style={{ background: 'rebeccapurple' }}>
          <UploadPhoto />
        </div>
      </div>
    );
  }
}

export default App;
