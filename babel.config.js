module.exports = function (api) {
  api.cache(true);
  
  const presets = [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript'
  ];

  const plugins = [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread'
  ];

  const productionPlugins = [
    ['transform-react-remove-prop-types', { removeImport: true }]
  ];

  const testPlugins = [
    '@babel/plugin-transform-modules-commonjs'
  ];

  return {
    presets,
    plugins,
    env: {
      production: {
        plugins: productionPlugins
      },
      test: {
        plugins: testPlugins
      }
    }
  };
};