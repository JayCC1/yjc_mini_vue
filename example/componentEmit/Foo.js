import { h } from '../../lib/yjc-mini-vue.esm.js'

export const Foo = {
  setup(props, { emit }) {
    const emitAdd = () => {
      console.log('emit add')
      emit('add', 1, 2)
      // 使用 - 的命名方式调用
      emit('add-foo', 1, 2)
    }

    return {
      emitAdd,
    }
  },
  render() {
    const btn = h(
      'button',
      {
        onClick: this.emitAdd,
      },
      'emitAdd'
    )

    const foo = h('p', {}, 'foo')
    return h('div', {}, [foo, btn])
  },
}
