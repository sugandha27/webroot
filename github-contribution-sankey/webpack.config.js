const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    mode: argv.mode || 'development',
    entry: './src/index.ts',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? 'github-contribution-sankey.min.js' : 'github-contribution-sankey.js',
      library: {
        name: 'GitHubContributionSankey',
        type: 'umd',
        export: 'default'
      },
      globalObject: 'this'
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    },
    devtool: isProduction ? false : 'source-map',
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: isProduction
            }
          }
        })
      ]
    },
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      compress: true,
      port: 8080,
      hot: true
    },
    externals: {
      // Add external dependencies here if needed
    }
  };
};
