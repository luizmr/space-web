const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isDevelopment = process.env.NODE_ENV === 'development'
const { CleanWebpackPlugin } = require('clean-webpack-plugin')


module.exports = {
    // mode: isDevelopment ? 'development' : 'production',
    context: __dirname,
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: "/"
    },
    module: {
        rules: [
        {
            test: /\.(tsx|ts)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        },
        {
            test: /\.(jpg|png)$/,
            loader: 'file-loader',
            include: path.join(__dirname, 'src'),
        },
        {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
        },
    ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.json', '.js', 'scss', 'css', 'png', 'jpg'],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: isDevelopment ? '[name].css' : '[name].[hash].css',
            chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
        }), 
        new CleanWebpackPlugin(),
        new HtmlWebPackPlugin({
            template: './public/index.html',
            filename: './index.html'
          })
      ],
    devServer: {
        historyApiFallback: true,
        hot: true,
        writeToDisk: true,
        open: true
    }
}

