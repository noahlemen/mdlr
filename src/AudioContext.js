import React, { Component } from 'react';

export const AudioContextBackend = window.AudioContext;

class AudioContext extends Component {
  getChildContext() {
    return {
      audioContext: this.audioContext
    };
  }

  audioContext = new AudioContextBackend();

  render() {
    return <div>{this.props.children}</div>;
  }
}

AudioContext.childContextTypes = {
  audioContext: React.PropTypes.instanceOf(AudioContextBackend)
};

export default AudioContext;
