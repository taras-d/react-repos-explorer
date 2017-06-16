var path = require('path'),
    webpack = require('webpack');
    
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin,
    HtmlWebpackPlugin = require('html-webpack-plugin');

var srcDir = path.join(__dirname, 'src'),
    distDir = path.join(__dirname, 'dist');

var config = {
    entry: { 
        app: path.join(srcDir, 'root.jsx'),
        vendors: path.join(srcDir, 'vendors.js')
    },
    output: {
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            'api': path.join(srcDir, 'api'),
            'lib': path.join(srcDir, 'components'),
            'moment': 'moment-mini'
        }
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: [srcDir],
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        presets: ['es2015', 'react']
                    }
                }
            },
            {
                test: /\.less$/,
                include: [srcDir],
                use: ['style-loader', 'css-loader', 'less-loader']
            }
        ]
    },
    devServer: {
        stats: 'minimal',
        overlay: true
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ 
            name: 'vendors'
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'index.html')
        }),
        // Uncomment line below to enable bundle analyzer
        //new BundleAnalyzerPlugin()
    ]
}

if (process.env.NODE_ENV === 'production') {

    var UglifyJSPlugin = require('uglifyjs-webpack-plugin'),
        ExtractTextPlugin = require("extract-text-webpack-plugin"),
        CleanWebpackPlugin = require('clean-webpack-plugin');

    config.output = {
        filename: '[name].[hash].min.js',
        path: distDir
    };
    config.devtool = false;
    config.module.rules[1].use = ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
            {
                loader: 'css-loader',
                options: {
                    minimize: {
                        discardComments: { removeAll: true }
                    }
                }
            }, 
            'less-loader'
        ]
    });
    config.plugins.push(
        new CleanWebpackPlugin(distDir),
        new webpack.DefinePlugin({
            'process.env': { 'NODE_ENV': '"production"' }
        }),
        new UglifyJSPlugin({ comments: false }),
        new ExtractTextPlugin("styles.[hash].min.css")
    );
}

module.exports = config;