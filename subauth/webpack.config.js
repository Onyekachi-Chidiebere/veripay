const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "Appmart",
    projectName: "subauth",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    devServer: {
      // contentBase: __dirname + '/dist',
      port: 3131,
      historyApiFallback: {
          index: 'Appmart-subauth.js'
      }
    }
  });
};
