import { h } from '../../lib/yjc-mini-vue.esm.js'
import { Foo } from './Foo.js'

export const App = {
  name: 'App',
  setup() {
    return {}
  },
  render() {
    // emit
    return h('div', {}, [
      h('div', {}, 'App'),
      h(Foo, {
        onAdd(a, b) {
          console.log('onAdd', a, b)
        },
        onAddFoo(a, b) {
          console.log('onAddFoo', a, b)
        },
      }),
    ])
  },
}
