module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: false,
  },
  webpack: {
    compat: {
      enzyme: true,
      sinon: true
    }
  },
  karma: {
    testContext: 'tests.webpack.js',
    frameworks: ['mocha', 'chai', 'chai-as-promised'],
    plugins: [
      require('karma-chai-plugins')
    ]
  }
};
