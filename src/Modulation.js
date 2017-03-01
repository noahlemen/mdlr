import React, { Component, cloneElement } from 'react';
import { AudioContextBackend } from './AudioContext.js';

class Modulation extends Component {
  componentWillMount() {
    this.gain = this.context.audioContext.createGain();
  }

  componentWillUnmount() {
    this.gain.disconnect();
  }

  render() {
    const { parameter, connectTo, children } = this.props;

    connectTo && parameter && this.gain.connect(connectTo[parameter]);

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

Modulation.contextTypes = {
  audioContext: React.PropTypes.instanceOf(AudioContextBackend)
};

Modulation.propTypes = {
  connectTo: React.PropTypes.object,
  parameter: React.PropTypes.string
};

export default Modulation;
