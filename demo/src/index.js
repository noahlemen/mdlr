import React, { Component } from 'react';
import { render } from 'react-dom';
import ntof from 'note-to-frequency';

import { AudioContext, Modulation, Oscillator, Output } from '../../src';

class App extends Component {
  state = {
    input: 'C4',
    note: 'C4'
  };

  handleChange = e => this.setState({ input: e.target.value });

  commitNote = e => {
    if (e.keyCode === 13) {
      this.setState({ note: this.state.input });
    }
  };

  render() {
    return (
      <div>
        <input
          value={this.state.input}
          onChange={this.handleChange}
          onKeyDown={this.commitNote}
        />
        <AudioContext>
          <Output>
            <Oscillator frequency={ntof(this.state.note)} waveform="sawtooth">
              <Modulation parameter="frequency">
                <Oscillator frequency={30} />
              </Modulation>
              <Modulation parameter="amplitude">
                <Oscillator frequency={2} />
              </Modulation>
            </Oscillator>
          </Output>
        </AudioContext>
      </div>
    );
  }
}

render(<App />, document.querySelector('#demo'));
