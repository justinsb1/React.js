// entry point . where does our app kick off? 
// where to output the final bundle file? 

// gives access to NODE path module . path allows you to concat file paths 
const path = require('path');



// module.exports is a NODE thing , a way to expose something(object) to another file
module.exports = {
    // provide webpack config details 
    // entry is the file that gets executed by default
    entry: './src/app.js' ,
    // output is an object
    output: {
        // path is where you want to output the file. must be an absolute path
        path: path.join(__dirname, 'public'),
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
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        }]
    },
    // sourcemap to easily locate errors . many different sourcemaps information on webpack.js.org/devtool.
    devtool:'cheap-module-eval-source-map',
    // 
    devServer: {
        // set equal to absolute path to public assets 
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true
    }
};


// LOADER - lets you customize the behavior of webpack when it loads a given file
