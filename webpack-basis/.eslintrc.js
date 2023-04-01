module.exports = {
  extends: ["eslint:recommended"],
  env: {
    node: true, // 启用node中全局变量
    browser: true, // 启用浏览器中全局变量
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
  },
  rules: {
    "no-var": 0, // 关闭 不能使用 var 定义变量
    "no-redeclare": 0, // 关闭 重复声明
    "no-unused-vars": 0, // 关闭 未使用的变量
    "no-self-assign": 0
  },
};