import React, { Component, cloneElement } from 'react';
import { AudioContextBackend } from './AudioContext.js';

class Output extends Component {
  componentWillMount() {
    this.gain = this.context.audioContext.createGain();

    this.gain.connect(this.context.audioContext.destination);
  }

  componentWillUnmount() {
    this.gain.disconnect();
  }

  render() {
    const { connectTo, children } = this.props;

    connectTo && this.gain.connect(connectTo);

    const newChildren = React.Children.map(children, (child) => (
      cloneElement(child, {
        connectTo: this.gain,
        ...child.props
      })
    ));

    return <div>{newChildren}</div>;
  }
}

Output.contextTypes = {
  audioContext: React.PropTypes.instanceOf(AudioContextBackend)
}

Output.propTypes = {
  connectTo: React.PropTypes.oneOfType([
    React.PropTypes.instanceOf(AudioParam),
    React.PropTypes.instanceOf(AudioNode)
  ])
}

export default Output;
