var path = require('path');

module.exports = {
    entry: './src/root.jsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'output')
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            'api': path.resolve(__dirname, 'src/api'),
            'lib': path.resolve(__dirname, 'src/components')
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
        publicPath: '/output'
    }
}