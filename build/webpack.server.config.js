const webpack = require("webpack");
const merge = require("webpack-merge");
const base = require("./webpack.base.config");
const nodeExternals = require("webpack-node-externals");
const VueSSRServerPlugin = require("vue-server-renderer/server-plugin");

module.exports = merge(base, {
  //if we use vue-loader, TypeScript or JSX, the code cannot run natively in Node.
  //Our code may also rely on some webpack-specific features
  //such as file handling with file-loader or style injection with style-loader,
  //both of which can be problematic when running inside a native Node module environment.
  target: "node",
  // for debug
  devtool: "#source-map",
  entry: "./src/demo2/entry-server.js",
  output: {
    filename: "server-bundle.js",
    libraryTarget: "commonjs2"
  },
  // https://webpack.js.org/configuration/externals/#externals
  // https://github.com/liady/webpack-node-externals
  externals: nodeExternals({
    // do not externalize CSS files in case we need to import it from a dep
    whitelist: /\.css$/
  }),
  //   module: {
  //     rules: [
  //       {
  //         test: /\.(le|sa|sc|c)ss?$/,
  //         use: ["vue-style-loader", "css-loader", "sass-loader"]
  //       }
  //     ]
  //   },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development"
      ),
      "process.env.VUE_ENV": '"server"'
    }),
    new VueSSRServerPlugin()
  ]
});
