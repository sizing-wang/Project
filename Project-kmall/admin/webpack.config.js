const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');


module.exports = {
    // 指定开发环境
    mode:'development', // development | production | none
    // 这里应用程序开始执行
    // webpack 开始打包
    // entry: './src/index1.js', // 单一入口
    // 多入口
    entry: {
        index: "./src/index.js",
        // common: "./src/view/common/common.js"
    },
    // 出口
    output: {
        // 使用nodejs的绝对路径
        path: path.resolve(__dirname, 'dist'),
        // filename: 'bundle.js' // 单出口
        filename: "[name]-[hash]-bundle.js", // 多出口
        publicPath: "/" // 配置静态资源路径
    },
   module: {
        // 处理css
    rules: [
        {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        },
        // 处理图片
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 10 // 当图片大小超过limit值后,会生成一个文件
                    }
                }
            ]
        },
        // 配置bable-loader
        {
            test:/\.js$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    // presets: ['env', 'react'],
                    presets: ['env','es2015','react','stage-3'],
                    "plugins": [
                        ["import", {
                            "libraryName": "antd",
                            "libraryDirectory": "es",
                            "style": "css" // `style: true` 会加载 less 文件
                        }]
                    ]
                }
            }
        }
    ]
   },
    plugins:[
        // 自动生成html文件
        new htmlWebpackPlugin({
            template:'./views/index.html',//模板文件
            filename:'index.html',//输出的文件名
            // inject:'head',//脚本写在那个标签里,默认是true(在body结束后)
            hash:true,//给生成的js/css文件添加一个唯一的hash
            chunks: ["index", "common"] // 只打包指定的文件
        }),
        // 自动清理多余文件
        new CleanWebpackPlugin()
    ],
    devServer:{
        contentBase: './dist', //内容的目录(自动刷新dist文件夹下的文件)
        port:8080, //服务运行的端口
        historyApiFallback:true // h5路由刷新页面,不会向后台请求数据
    }
};


