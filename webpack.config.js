const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  entry: {
    main: "./src/index.js",
    script: "./src/script.js"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output; optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env",
              {
                "useBuiltIns": "entry",
                "corejs": "2.6.5"
              }]]
          }
        }
      },
      {
        test: /\.css/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.s(a|c)ss$/,
        use: [
          isProduction
            ? MiniCssExtractPlugin.loader
            : { loader: "style-loader", options: { sourceMap: true } },
          { loader: "css-loader", options: { sourceMap: isProduction } },
          { loader: "postcss-loader", options: { sourceMap: isProduction } },
          { loader: "sass-loader", options: { sourceMap: isProduction } }
        ]
      }
    ]
  }
};
