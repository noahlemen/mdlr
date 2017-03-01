import React, { Component, cloneElement } from 'react';
import { AudioContextBackend } from './AudioContext.js';

class Oscillator extends Component {
  componentWillMount() {
    this.oscillator = this.context.audioContext.createOscillator();
    this.gain = this.context.audioContext.createGain();

    this.oscillator.connect(this.gain);
    this.oscillator.start();

    this.modulations = {
      frequency: this.oscillator.frequency,
      amplitude: this.gain.gain
    };
  }

  componentWillUnmount() {
    this.gain.disconnect();
    this.oscillator.disconnect();
  }

  render() {
    const {
      frequency,
      amplitude,
      waveform,
      connectTo,
      children
    } = this.props;

    this.oscillator.type = waveform;
    this.oscillator.frequency.setValueAtTime(frequency, 0);
    this.gain.gain.value = amplitude;

    connectTo && this.gain.connect(connectTo);

    const newChildren = React.Children.map(
      children,
      child => cloneElement(child, {
        connectTo: this.modulations,
        ...child.props
      })
    );

    return <div>{newChildren}</div>;
  }
}

Oscillator.contextTypes = {
  audioContext: React.PropTypes.instanceOf(AudioContextBackend)
};

Oscillator.propTypes = {
  frequency: React.PropTypes.number,
  amplitude: React.PropTypes.number,
  waveform: React.PropTypes.oneOf(['sine', 'square', 'sawtooth', 'triangle']),
  connectTo: React.PropTypes.oneOfType([
    React.PropTypes.instanceOf(AudioParam),
    React.PropTypes.instanceOf(AudioNode)
  ])
};

Oscillator.defaultProps = {
  frequency: 440,
  amplitude: 1,
  waveform: 'sine'
};

export default Oscillator;
