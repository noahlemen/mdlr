import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import chaiAsPromised from 'chai-as-promised';
import sinonChai from 'sinon-chai';
import 'web-audio-test-api';

chai.use(chaiEnzyme());
chai.use(chaiAsPromised);
chai.use(sinonChai);

const context = require.context('./tests', true, /\.spec\.js/);
context.keys().forEach(context);
