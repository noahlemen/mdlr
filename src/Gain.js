import React, { Component, cloneElement } from 'react';
import { AudioContextBackend } from './AudioContext.js';

class Gain extends Component {
  componentWillMount() {
    this.gain = this.context.audioContext.createGain();

    this.modulations = {
      amplitude: this.gain.gain
    };
  }

  componentWillUnmount() {
    this.gain.disconnect();
  }

  render() {
    const { amplitude, connectTo, children } = this.props;

    this.gain.gain.value = amplitude;

    connectTo && this.gain.connect(connectTo);

    const newChildren = React.Children.map(
      children,
      child => cloneElement(child, {
        connectTo: this.gain,
        ...child.props
      })
    );

    return <div>{newChildren}</div>;
  }
}

Gain.contextTypes = {
  audioContext: React.PropTypes.instanceOf(AudioContextBackend)
};

Gain.propTypes = {
  amplitude: React.PropTypes.number,
  connectTo: React.PropTypes.oneOfType([
    React.PropTypes.instanceOf(AudioParam),
    React.PropTypes.instanceOf(AudioNode)
  ])
};

export default Gain;
