# mdlr [![Build Status][build-badge]][build] [![npm package][npm-badge]][npm]
```
⚠️ mdlr is just a lil bb library right now ⚠️
⚠️ ~please contribute if it interests you~ ⚠️
```
### table of contents

- [intent](#intent)
- [installation](#installation)
- [usage](#usage)
- [reference](#reference)
- [development](#development)

## intent

`mdlr` is an abstraction of synthesis via the web audio API in the form of composable React components.

While it draws inspiration from [`react-music`](https://github.com/formidablelabs/react-music), its goals differ. If [`react-music`](https://github.com/formidablelabs/react-music) could be considered most equivalent to a synthesizer workstation, `mdlr` would be best compared to [Max](https://cycling74.com/products/max/) (perhaps its [BEAP](https://cycling74.com/2013/06/19/beap-analog-model-curriculum-outline/) library in particular), or [modular synthesizers](https://en.wikipedia.org/wiki/Modular_synthesizer). Nonetheless, `mdlr` draws inspiration from other javascript libraries and web audio API abstractions such as [`react-music`](https://github.com/formidablelabs/react-music) and [`i_dropped_my_phone_the_screen_cracked`](https://github.com/billorcutt/i_dropped_my_phone_the_screen_cracked)

`mdlr` is not concerned with implementing methods of control like sequencers, MIDI input, or basic musical time structures. In fact, `mdlr` doesn't even implement musical pitch (since this is easily derived by other utilities like [`note-to-frequency`](https://www.npmjs.com/package/note-to-frequency)) in favor of frequency. Decisions about control, timing, temperament, etc. are better made in the context of `mdlr`'s use.

## installation

via `npm`:
```
npm install --save mdlr
```

or via `yarn`:

```
yarn add mdlr
```

## usage

to create a component that renders a sawtooth carrier oscillation at a frequency specified by its `freq` prop with a 30 Hz sine oscillation modulating its frequency and a second 2 Hz sine oscillation modulating its amplitude:
```jsx
import React from 'react';
import { AudioContext, Output, Oscillator, Modulation } from 'mdlr';

class ToneGenerator extends React.Component {
  render() {
    return (
      <AudioContext>
        <Output>
          <Oscillator frequency={this.props.freq} waveform="sawtooth">
            <Modulation parameter="frequency">
              <Oscillator frequency={30} />
            </Modulation>
            <Modulation parameter="amplitude">
              <Oscillator frequency={2} />
            </Modulation>
          </Oscillator>
        </Output>
      </AudioContext>
    );
  }
}
```

## reference

```
⚠️ documentation for components needed here! ⚠️
```

## development

### prerequisites

[Node.js](http://nodejs.org/) >= v4 and [Yarn](https://yarnpkg.com) must be installed.

### installation

- Running `yarn install` in the components's root directory will install everything you need for development.

### demo development server

- `yarn start` will run a development server with the component's demo app at [http://localhost:3000](http://localhost:3000) with hot module reloading.

### formatting

- `yarn lint` will run linter on scripts.
- `yarn pretty` will prettify scripts.

### running tests

- `yarn test` will run the tests once.

- `yarn test:coverage` will run the tests and produce a coverage report in `coverage/`.

- `yarn test:watch` will run the tests on every change.

### building

- `yarn build` will build the component for publishing to npm and also bundle the demo app.

- `yarn clean` will delete built resources.

[build-badge]: https://img.shields.io/circleci/project/github/kedromelon/mdlr/master.svg?style=flat
[build]: https://circleci.com/gh/kedromelon/mdlr

[npm-badge]: https://img.shields.io/npm/v/mdlr.svg?style=flat
[npm]: https://www.npmjs.org/package/mdlr
