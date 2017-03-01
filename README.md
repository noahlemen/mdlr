# mdlr [![Build Status][build-badge]][build] [![npm package][npm-badge]][npm]

a react component library for building declarative synthesizer instruments and systems

## installation

```
npm install --save mdlr
```

or

```
yarn add mdlr
```

## usage 

```es6
import { AudioContext, Output, Oscillator } from 'mdlr';

const ToneGenerator = ({ freq }) => (
  <AudioContext>
    <Output>
      <Oscillator frequency={freq} />
    </Output>
  </AudioContext>
);
```

[build-badge]: https://img.shields.io/circleci/project/github/kedromelon/mdlr/master.svg?style=flat
[build]: https://circleci.com/gh/kedromelon/mdlr

[npm-badge]: https://img.shields.io/npm/v/mdlr.svg?style=flat
[npm]: https://www.npmjs.org/package/mdlr
