import { h } from '../../lib/yjc-mini-vue.esm.js'

window.self = null
export const App = {
  // 平常都是写 .vue 单文件组件
  // 用 <template></template> 模板编译去写，目前还没有实现
  // 所以使用 render 函数去写，因为 template 最终也会编译成为一个 render 函数

  setup() {
    // composition api
    return {
      msg: 'mini-vue-haha',
    }
  },
  render() {
    window.self = this
    return h(
      'div',
      {
        id: 'root',
        class: ['red', 'hard'],
      },
      // setupState 获取值
      // this.$el 获取当前组件的根元素（在当前组件中也就是 div）
      'hi，' + this.msg
      // string 类型
      // 'hi, mini-vue'
      // Array 类型
      // [h('p', { class: 'red' }, 'hi'), h('p', { class: 'blue' }, 'mini-vue')]
    )
  },
}
