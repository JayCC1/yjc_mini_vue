import { hasOwn } from '../shared'

const publicPropertiesMap = {
  $el: (i) => i.vnode.el,
  $slots: (i) => i.slots,
}

export const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    // setupState 中获取值
    const { setupState, props } = instance

    if (hasOwn(setupState, key)) {
      return setupState[key]
    }
    if (hasOwn(props, key)) {
      return props[key]
    }

    const publicGetter = publicPropertiesMap[key]
    if (publicGetter) {
      return publicGetter(instance)
    }
    return undefined
  },
}
