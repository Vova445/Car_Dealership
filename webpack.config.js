const path = require('path');

module.exports = {
    mode: 'production',
  entry: {
    script: './scripts/script.ts',
    auth: './scripts/auth.ts'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public/dist')
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  }
};
