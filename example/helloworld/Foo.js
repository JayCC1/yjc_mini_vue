import { h } from '../../lib/yjc-mini-vue.esm.js'

export const Foo = {
  setup(props) {
    // props.count
    // 3.
    // props 不可以被修改是 shallowReadonly
    props.count++
    console.log(props)
  },
  render() {
    return h('div', {}, 'foo: ' + this.count)
  },
}
