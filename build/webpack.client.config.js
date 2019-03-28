const webpack = require("webpack");
const merge = require("webpack-merge");
const base = require("./webpack.base.config");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");

const config = merge(base, {
  entry: {
    app: "./src/demo2/entry-client.js"
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        chunks: "initial",
        name: "vendor",
        test: /node_modules\//,
        minChunks: function(module) {
          // a module is extracted into the vendor chunk if...
          return (
            // it's inside node_modules
            /node_modules/.test(module.context) &&
            // and not a CSS file (due to extract-text-webpack-plugin limitation)
            !/\.css$/.test(module.request)
          );
        },
        miniSize: "2"
      }
    },
    runtimeChunk: {
      name: "manifest"
    }
  },
  // module: {
  //   rules: [
  //     {
  //       test: /\.(le|sa|sc|c)ss?$/,
  //       use: [
  //         MiniCssExtractPlugin.loader,
  //         "vue-style-loader",
  //         "css-loader",
  //         "sass-loader"
  //       ]
  //     }
  //   ]
  // },
  plugins: [
    // strip dev-only code in Vue source
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development"
      ),
      "process.env.VUE_ENV": '"client"'
    }),
    // new MiniCssExtractPlugin({
    //   filename: "[name].css"
    // }),
    // extract vendor chunks for better caching
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: "vendor",
    //   minChunks: function(module) {
    //     // a module is extracted into the vendor chunk if...
    //     return (
    //       // it's inside node_modules
    //       /node_modules/.test(module.context) &&
    //       // and not a CSS file (due to extract-text-webpack-plugin limitation)
    //       !/\.css$/.test(module.request)
    //     );
    //   }
    // }),
    // // extract webpack runtime & manifest to avoid vendor chunk hash changing
    // // on every build.
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: "manifest"
    // }),
    new VueSSRClientPlugin()
  ]
});

module.exports = config;
