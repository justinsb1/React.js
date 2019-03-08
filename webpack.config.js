

// entry point . where does our app kick off? 
// where to output the final bundle file? 

// gives access to NODE path module . path allows you to concat file paths 
const path = require('path');
// WIll extract the styles into their own files
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'test'){
    require('dotenv').config({ path: '.env.test' });
} else if (process.env.NODE_ENV === 'development') {
    require('dotenv').config({ path: '.env.development' });
}

module.exports = (env) => {
    const isProduction = env === 'production';
    const CSSExtract = new ExtractTextPlugin('styles.css');
    return {
            // provide webpack config details 
            // entry is the file that gets executed by default
            entry: ['babel-polyfill', './src/app.js'] ,
            // output is an object
            output: {
                // path is where you want to output the file. must be an absolute path
                path: path.join(__dirname, 'public', 'dist'),
                filename: 'bundle.js'
            },
            // set up loader
            module: {
                rules: [{
                    loader: 'babel-loader',
                    // what files do we want to run this loader on. run babel on files that end with .js that are not in the node_modules folder
                    test: /\.js$/,
                    exclude: /node_modules/
                }, { // set up css for webpack. test css and scss files. s? is optional
                    test: /\.s?css$/,
                    // use allows you to provide an array of loaders
                    use: CSSExtract.extract({
                        use: [
                            {
                                loader: 'css-loader' ,
                                options: {
                                    sourceMap: true
                                }
                            } ,
                            {
                                loader: 'sass-loader' ,
                                options: {
                                    sourceMap: true
                                }
                            }
                        ]
                    })
                }]
            },
            plugins: [
                CSSExtract,
                new webpack.DefinePlugin({
                    'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
                    'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
                    'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
                    'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
                    'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
                    'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID)
                })
            ],
            // sourcemap to easily locate errors . many different sourcemaps information on webpack.js.org/devtool.
            devtool: isProduction ? 'source-map' : 'inline-source-map',
            // 
            devServer: {
                // set equal to absolute path to public assets 
                contentBase: path.join(__dirname, 'public'),
                historyApiFallback: true,
                publicPath: '/dist'
        }
    };
};


// LOADER - lets you customize the behavior of webpack when it loads a given file
