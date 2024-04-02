import { h } from '../../lib/yjc-mini-vue.esm.js'

export const App = {
  // 平常都是写 .vue 单文件组件
  // 用 <template></template> 模板编译去写，目前还没有实现
  // 所以使用 render 函数去写，因为 template 最终也会编译成为一个 render 函数

  setup() {
    // composition api
    return {
      msg: 'mini-vue',
    }
  },
  render() {
    return h('div', 'hi，' + this.msg)
  },
}
