import { createComponentInstance, setupComponent } from './component'

export function render(vnode, container) {
  // patch
  //

  patch(vnode, container)
}

function patch(vnode, container) {
  // 去处理组件

  // 判断 是不是 element
  processComponent(vnode, container)
}
function processComponent(vnode: any, container: any) {
  mountComponent(vnode, container)
}

function mountComponent(vnode: any, container: any) {
  const instance = createComponentInstance(vnode)

  setupComponent(instance)

  setupRenderEffect(instance, container)
}
function setupRenderEffect(instance: any, container: any) {
  const subTree = instance.render()

  // subTree 就是虚拟节点树
  // vnode 是组件时继续走 patch
  // vnode 是element 则 mountElement挂载
  patch(subTree, container)
}