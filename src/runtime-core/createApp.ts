import { render } from './renderer'
import { createVNode } from './vnode'

export function createApp(rootComponent) {
  return {
    mount(rootContainer) {
      // 先转换 VNode
      // component ==> VNode
      // 所有的逻辑操作 都会基于 VNode 做处理

      const vnode = createVNode(rootComponent)

      render(vnode, rootContainer)
    },
  }
}
