import { h } from '../../lib/yjc-mini-vue.esm.js'
import { Foo } from './Foo.js'

export const App = {
  name: 'App',
  setup() {
    return {}
  },
  render() {
    const app = h('div', {}, 'App')
    // const foo = h(Foo, {}, [h('p', {}, '123'), h('p', {}, '456')])
    // const foo = h(Foo, {}, h('p', {}, '123'))
    const foo = h(
      Foo,
      {},
      {
        header: ({ age }) => h('p', {}, 'header' + age),
        footer: () => h('p', {}, 'footer'),
      }
    )

    // emit
    return h('div', {}, [app, foo])
  },
}
