import React, { Component } from 'react';
import AudioContext from './AudioContext.js';
import Oscillator from './Oscillator.js';

import './App.css';

class App extends Component {
  render() {
    return (
      <AudioContext>
        <Oscillator amplitude={1} frequency={880} />
        <Oscillator amplitude={1} frequency={440} />
      </AudioContext>
    );
  }
}

export default App;
