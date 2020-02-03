const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const getHtmlConfig = (fileName, title) => ({
    template:`./src/views/${fileName}.html`,//模板文件
    title: title,
    filename:`${fileName}.html`,//输出的文件名
    // inject:'head',//脚本写在那个标签里,默认是true(在body结束后)
    hash:true,//给生成的js/css文件添加一个唯一的hash
    chunks: [fileName, "common"] // 只打包指定的文件
})


module.exports = {
    // 指定开发环境
    mode:'development', // development | production | none
    // 这里应用程序开始执行
    // webpack 开始打包
    // entry: './src/index1.js', // 单一入口
    // 多入口
    entry: {
        "common": "./src/pages/common",
        "index": "./src/pages/index",
        "list": "./src/pages/list",
        "user-login": "./src/pages/user-login",
        "user-register": "./src/pages/user-register",
        "result": "./src/pages/result",
        "user-center": "./src/pages/user-center",
        "user-update-password": "./src/pages/user-update-password",
        "detail": "./src/pages/detail",
        "cart": "./src/pages/cart",
        "order-confirm": "./src/pages/order-confirm",
        "payment": "./src/pages/payment",
        "order-list": "./src/pages/order-list",
        "order-detail": "./src/pages/order-detail"
    },
    // 出口
    output: {
        path: path.resolve(__dirname, 'dist'), // 使用nodejs的绝对路径
        filename: "js/[name]-[hash]-bundle.js", // 多出口
        publicPath: "/" // 配置静态资源路径
    },

    //配置文件别名
    resolve:{
        alias:{
            pages:path.resolve(__dirname,'./src/pages'),
            util:path.resolve(__dirname,'./src/util'),
            common:path.resolve(__dirname,'./src/common'),
            api:path.resolve(__dirname,'./src/api'),
            node_modules:path.resolve(__dirname,'./node_modules')
        }
    },
   module: {
    rules: [
        // 处理css
        {
            test: /\.css$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                    }
                },
                "css-loader"
            ]
        },
        // 处理图片/资源
        {
            test: /\.(png|svg|jpg|gif|ttf|woff2|woff|eot)\??.*$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 400, // 当图片大小超过limit值后,会生成一个文件
                        name: "resource/[name].[ext]"
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
                    presets: ['env','es2015','stage-3']
                }
            }
        },
        // 配置tpl
        {
            test:/\.tpl$/,
            use: {
                loader: 'html-loader'
            }
        }
    ]
   },
    plugins:[
        // 自动生成html文件 // html模板文件
        new htmlWebpackPlugin(getHtmlConfig("index", "首页")),
        new htmlWebpackPlugin(getHtmlConfig("list", "列表页")),
        new htmlWebpackPlugin(getHtmlConfig("user-login", "用户登录")),
        new htmlWebpackPlugin(getHtmlConfig("user-register", "用户注册")),
        new htmlWebpackPlugin(getHtmlConfig("result", "结果页")),
        new htmlWebpackPlugin(getHtmlConfig("user-center", "个人中心")),
        new htmlWebpackPlugin(getHtmlConfig("user-update-password", "修改密码")),
        new htmlWebpackPlugin(getHtmlConfig("detail", "详情页")),
        new htmlWebpackPlugin(getHtmlConfig("cart", "购物车")),
        new htmlWebpackPlugin(getHtmlConfig("order-confirm", "订单确认")),
        new htmlWebpackPlugin(getHtmlConfig("payment", "订单支付")),
        new htmlWebpackPlugin(getHtmlConfig("order-list", "订单列表")),
        new htmlWebpackPlugin(getHtmlConfig("order-detail", "订单详情")),
        // 自动清理多余文件
        new CleanWebpackPlugin(),
        // 单独打包css文件
        new MiniCssExtractPlugin({
            filename: "css/[name]-[hash]-bundle.css"
        })
    ],
    devServer:{
        contentBase: './dist', //内容的目录(自动刷新dist文件夹下的文件)
        port:3002, //服务运行的端口
        proxy: [{
            // 以下代码的含义: 只要以sessions开头的地址请求, 都由target指定的地址代理发送请求
            context: [
                '/sessions',
                "/users",
                "/categories",
                "/ads",
                "/floors",
                "/products",
                "/carts",
                "/orders",
                "/shippings",
                "/payments"
            ],
            target: 'http://127.0.0.1:3000'
        }]
    }
};


