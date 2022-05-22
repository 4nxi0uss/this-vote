// const path = require('path').resolve;
// const HtmlWebpackPlugin = require('html-webpack-plugin');

// module.exports={
//     entry:{
//         index: path(__dirname, '..', 'src','index.js'),
//     },
//     output:{
//         filename: '[name].[contenthash:6].js',
//         path: path(__dirname,'..','build'),
//     },
//     resolve:{
//         extensions: ['.js','.ts', '.jsx', '.tsx'],
    
//     },
//     module:{
//         rules: [
//             {
//                 test: /\.(js|jsx)$/,
//                 exclude: /node_modules/,
//                 use:{
//                     loader: 'babel-loader',
//                 }
//             }
//         ]
//     },
//     plugins:[
//         new HtmlWebpackPlugin({
//             template: path(__dirname,'..','public', 'index.html'),
//         })
//     ]
// }