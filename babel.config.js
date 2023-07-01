module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }], // 以当前 node 版本为 基础 作为一个转换
    "@babel/preset-typescript", // 适用 typeScript
  ],
};
