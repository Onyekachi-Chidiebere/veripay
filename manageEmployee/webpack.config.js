const { merge } = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-react');

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: 'Appmart',
    projectName: 'manageEmployee',
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    devServer: {
      port: 3134,
      historyApiFallback: {
        index: 'Appmart-manageEmployee.js',
      },
    },
  });
};
