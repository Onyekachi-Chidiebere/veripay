const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "Appmart",
    projectName: "subdashboard",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    devServer: {
      // contentBase: __dirname + '/dist',
      port: 2020,
      historyApiFallback: {
          index: 'Appmart-subdashboard.js'
      }
    }
  });
};
