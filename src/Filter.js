import React, { Component, cloneElement } from 'react';
import { AudioContextBackend } from './AudioContext.js';

class Filter extends Component {
  componentWillMount() {
    this.filter = this.context.audioContext.createBiquadFilter();

    this.modulations = {
      frequency: this.filter.frequency,
      Q: this.filter.Q
    };
  }

  componentWillUnmount() {
    this.filter.disconnect();
  }

  render() {
    const { frequency, Q, connectTo, children } = this.props;

    this.filter.frequency.setValueAtTime(frequency, 0);
    this.filter.Q = Q;

    connectTo && this.filter.connect(connectTo);

    const newChildren = React.Children.map(
      children,
      child => cloneElement(child, {
        connectTo: this.filter,
        ...child.props
      })
    );

    return <div>{newChildren}</div>;
  }
}

Filter.contextTypes = {
  audioContext: React.PropTypes.instanceOf(AudioContextBackend)
};

Filter.propTypes = {
  frequency: React.PropTypes.number,
  Q: React.PropTypes.number,
  connectTo: React.PropTypes.oneOfType([
    React.PropTypes.instanceOf(AudioParam),
    React.PropTypes.instanceOf(AudioNode)
  ])
};

export default Filter;
