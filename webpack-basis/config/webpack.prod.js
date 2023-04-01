const path = require('path');
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

// 获取处理样式的Loaders
const getStyleLoaders = (preProcessor) => {
  return [
    MiniCssExtractPlugin.loader,
    "css-loader",
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: [
            "postcss-preset-env", // 能解决大多数样式兼容性问题
          ],
        },
      },
    },
    preProcessor,
  ].filter(Boolean);
};

module.exports = {
  // 入口
  entry: "./src/main.js",
  // 输出
  output: {
    path: path.resolve(__dirname, "../dist"), // 生产模式会输出dist
    filename: "static/js/main.js", // 将 js 文件输出到 static/js 目录中
    clean: true,
  },
  // 加载器
  module: {
    rules: [
      // 处理 css 资源
      {
        // 匹配 .css 结尾的文件
        test: /\.css$/,
        // use 数组里面的 Loader 执行顺序是从右到左
        // use: ["style-loader", "css-loader"],
        // use: [
        //   MiniCssExtractPlugin.loader,
        //   "css-loader",
        //   {
        //     loader: "postcss-loader",
        //     options: {
        //       postcssOptions: {
        //         plugins: [
        //           "postcss-preset-env", // 能解决大多数样式兼容性问题
        //         ],
        //       },
        //     },
        //   },
        // ],
        use: getStyleLoaders(),
      },
      // 处理 less 资源
      {
        // 匹配 .less 结尾的文件
        test: /\.less$/,
        // use: ["style-loader", "css-loader", "less-loader"],
        // use: [
        //   MiniCssExtractPlugin.loader,
        //   "css-loader",
        //   {
        //     loader: "postcss-loader",
        //     options: {
        //       postcssOptions: {
        //         plugins: [
        //           "postcss-preset-env", // 能解决大多数样式兼容性问题
        //         ],
        //       },
        //     },
        //   },
        //   "less-loader"],
        use: getStyleLoaders("less-loader"),
      },
      // 处理 scss 和 sass 资源
      {
        // 匹配 .scss .sass 结尾的文件
        test: /\.s[ac]ss$/,
        // use: ["style-loader", "css-loader", "sass-loader"],
        // use: [
        //   MiniCssExtractPlugin.loader,
        //   "css-loader",
        //   {
        //     loader: "postcss-loader",
        //     options: {
        //       postcssOptions: {
        //         plugins: [
        //           "postcss-preset-env", // 能解决大多数样式兼容性问题
        //         ],
        //       },
        //     },
        //   },
        //   "sass-loader"],
        use: getStyleLoaders("sass-loader"),
      },
      // 处理 styl 资源
      {
        // 匹配 .styl 结尾的文件
        test: /\.styl$/,
        // use: ["style-loader", "css-loader", "stylus-loader"],
        // use: [
        //   MiniCssExtractPlugin.loader,
        //   "css-loader",
        //   {
        //     loader: "postcss-loader",
        //     options: {
        //       postcssOptions: {
        //         plugins: [
        //           "postcss-preset-env", // 能解决大多数样式兼容性问题
        //         ],
        //       },
        //     },
        //   },
        //   "stylus-loader"],
        use: getStyleLoaders("stylus-loader"),
      },
      // 处理图片资源
      {
        // 匹配相应后缀的文件
        test: /\.(png|jpe?g|gif|webp)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 15 * 1024 // 小于15kb的图片会被base64处理
          }
        },
        generator: {
          // 将图片文件输出到 static/images 目录中
          // 将图片文件命名 [hash:8][ext][query]
          // [hash:8]: hash值取8位
          // [ext]: 使用之前的文件扩展名
          // [query]: 添加之前的query参数
          filename: "static/images/[hash:8][ext][query]",
        },
      },
      // 处理字体、图标、音频、视频等资源
      {
        test: /\.(ttf|woff2?|map4|map3|avi)$/,
        type: "asset/resource",
        generator: {
          filename: "static/media/[hash:10][ext][query]",
        },
      },
      // 处理 js 资源
      {
        test: /\.js$/,
        exclude: /node_modules/, // 排除node_modules代码不编译
        loader: "babel-loader",
      },
    ],
  },
  // 插件
  plugins: [
    new ESLintWebpackPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, "../src"), // 修改路径
    }),
    new HtmlWebpackPlugin({
      // 以 public/index.html 为模板创建文件
      // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
      template: path.resolve(__dirname, "../public/index.html"), // 修改路径
    }),
    // 提取css成单独文件
    new MiniCssExtractPlugin({
      filename: "static/css/main.css"
    }),
    // css压缩
    new CssMinimizerPlugin(),
  ],
  // devServer: {
  //   host: "localhost", // 启动服务器域名
  //   port: "3000", // 启动服务器端口号
  //   open: true, // 是否自动打开浏览器
  // },
  // 模式
  mode: "production",
};