export function createComponentInstance(vnode) {
  const component = {
    vnode,
    type: vnode.type,
  }

  return component
}

export function setupComponent(instance) {
  // TODO
  // initProps()
  // initSlots()

  setupStatefulComponent(instance)
}
function setupStatefulComponent(instance: any) {
  const Component = instance.type

  const { setup } = Component

  if (setup) {
    // setup 可以返回 function 或者 Object
    const setupResult = setup()
    handleSetupResult(instance, setupResult)
  }
}
function handleSetupResult(instance, setupResult: any) {
  // setup 可以返回 function 或者 Object
  // TODO function

  if (typeof setupResult === 'object') {
    instance.setupState = setupResult
  }

  finishComponentSetup(instance)
}

function finishComponentSetup(instance: any) {
  const Component = instance.type

  if (!Component.render) {
    instance.render = Component.render
  }
}