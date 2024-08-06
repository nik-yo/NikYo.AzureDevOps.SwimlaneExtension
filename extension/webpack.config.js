const path = require("path");
const fs = require("fs");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const entries = fs
  .readdirSync(path.join(__dirname, "src"))
  .filter((dir) => fs.statSync(path.join("src", dir)).isDirectory())
  .reduce((acc,dir) => ({...acc, [dir]: `./src/${dir}/${dir}`}), {});

module.exports = {
    entry: entries,
    devtool: "inline-source-map",
    output: {
        filename: "[name]/[name].js",
        publicPath: "/dist/"
    },
    devServer: {
      server: 'https',
      port: 3000
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
      alias: {
          "azure-devops-extension-sdk": path.resolve("node_modules/azure-devops-extension-sdk")
      },
    },
    stats: {
        warnings: false
    },
    module: {
        rules: [
          {
            test: /\.(ts|tsx)$/i,
            loader: "ts-loader",
            exclude: ["/node_modules/"]
          },
          {
              test: /\.s[ac]ss$/i,
              use: ["style-loader", "css-loader", "sass-loader"],
          },
          {
              test: /\.css$/i,
              use: ["style-loader", "css-loader"],
          },
          {
              test: /\.(woff|woff2|eot|svg|ttf|otf|png|jpg|gif)$/i, 
              type: 'asset'
          }
        ]
    },
    plugins: [
        new CopyWebpackPlugin({
          patterns: [
            { from: "**/*.html", context: "src/" }
          ]
        })
    ]
};
