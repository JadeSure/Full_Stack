// // common js ways
const path = require('path')
// // ES6 js version
// import path from 'path'

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "app.js",
        // __dirname 内部获取的目录
        path: path.resolve(__dirname, "public")
    },
    devServer:{
        static: {
            directory: path.join(__dirname, "public")
        },
        compress: true,
        port: 9000
    },
    mode: "development"
}