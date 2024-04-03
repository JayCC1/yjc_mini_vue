import { isObject } from '../shared'
import { createComponentInstance, setupComponent } from './component'

export function render(vnode, container) {
  // patch
  //

  patch(vnode, container)
}

function patch(vnode, container) {
  // 去处理组件

  // TODO 判断 vnode 是不是一个 element
  // 是 element 那么就应该处理 element
  // 思考题：如何去区分是 element 还是 component 类型呢？
  if (typeof vnode.type === 'string') {
    processElement(vnode, container)
  } else if (isObject(vnode.type)) {
    processComponent(vnode, container)
  }
}

function processElement(vnode: any, container: any) {
  // 分两种情况
  // 1.init 初始化
  // 2.update 更新
  mountElement(vnode, container)
}

function mountElement(vnode: any, container: any) {
  const el = (vnode.el = document.createElement(vnode.type))

  // 对应 vnode 中的 children，children 中又可分为两种类型
  // 1. string
  // 2. array
  const { children, props } = vnode
  if (typeof children === 'string') {
    el.textContent = children
  } else if (Array.isArray(children)) {
    // vnode
    mountChildren(vnode, el)
  }

  // 对应 vnode 中的 props
  for (const key in props) {
    const val = props[key]
    el.setAttribute(key, val)
  }

  container.append(el)
}

function mountChildren(vnode, container) {
  vnode.children.forEach((v) => {
    patch(v, container)
  })
}

function processComponent(vnode: any, container: any) {
  mountComponent(vnode, container)
}

function mountComponent(initialVNode: any, container: any) {
  const instance = createComponentInstance(initialVNode)

  setupComponent(instance)

  setupRenderEffect(instance, initialVNode, container)
}
function setupRenderEffect(instance: any, initialVNode, container: any) {
  const { proxy } = instance
  const subTree = instance.render.call(proxy)

  // subTree 就是虚拟节点树
  // vnode 是组件时继续走 patch
  // vnode 是element 则 mountElement挂载
  patch(subTree, container)

  // subTree 一层层往下的，所以 subTree 中的 el 也就是根节点
  initialVNode.el = subTree.el
}
