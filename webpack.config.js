var path = require('path'),
    webpack = require('webpack');
    
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: { 
        app: './src/root.jsx',
        vendors: './src/vendors.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'output')
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            'api': path.resolve(__dirname, 'src/api'),
            'lib': path.resolve(__dirname, 'src/components'),
            'moment': 'moment-mini'
        }
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react']
                    }
                }
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            }
        ]
    },
    devServer: {
        publicPath: '/output',
        stats: 'minimal',
        overlay: true
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ 
            name: 'vendors'
        }),
        //new BundleAnalyzerPlugin()
    ]
}