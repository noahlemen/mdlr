import React, { Component, cloneElement } from 'react';
import { AudioContextBackend } from './AudioContext.js';

/*
NEXT STEPS:
  need some api that exposes AudioNode.connect

  use cases for this api will be to:
    - connect an oscillator to another oscillator
      as a modulator of a parameter
    - connect an oscillator as input to a filter
    - connect an oscillator to a filter
      as a modulator of a parameter
    - connect an envelope generator to an oscillator
      as a modulator of a parameter
    - connect an envelope generator to a filter
      as a modulator of a parameter
    - connect a sound source to "speakers"

  api should somehow metaphorically feel like
  patch cables on a modular synth or in max

  composition seems like it might work BUT
    - in what direction should signal flow go?
      up or down in render tree?
    - what if the same source needs to go to
      multiple 'modules'?
    - what if multiple modulators need to go
      one 'module'?

  additionally, composition seems to make sense when
  patching to an "input" (like speakers or a filter)
  but seems to make less sense for patching to modulate
  parameters

  <Bus> or <Multiple> component could solve some issues
  with composition-as-patching metaphor?
*/

class Oscillator extends Component {
  componentWillMount() {
    this.oscillator = this.context.audioContext.createOscillator();
    this.gain = this.context.audioContext.createGain();

    this.oscillator.connect(this.gain);
    this.oscillator.start();

    this.props.connectTo || this.gain.connect(this.context.audioContext.destination);
  }

  componentWillUnmount() {
    this.gain.disconnect();
    this.oscillator.disconnect();
  }

  render() {
    const { frequency, amplitude, connectTo, children } = this.props;

    this.oscillator.frequency.setValueAtTime(frequency, 0);
    this.gain.gain.value = amplitude;
    connectTo && this.gain.connect(connectTo);

    const newChildren = React.Children.map(children, (child) => (
      cloneElement(child, {
        connectTo: this.oscillator.frequency,
        ...child.props
      })
    ));

    return (
      <div>
        {newChildren}
      </div>
    );
  }
}

Oscillator.contextTypes = {
  audioContext: React.PropTypes.instanceOf(AudioContextBackend)
}

Oscillator.propTypes = {
  frequency: React.PropTypes.number,
  amplitude: React.PropTypes.number,
  connectTo: React.PropTypes.instanceOf(AudioParam)
}

export default Oscillator;
