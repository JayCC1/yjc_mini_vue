import { createVNode } from '../vnode'
// eslint-disable-next-line consistent-return
export function renderSlots(slots, name, props) {
  const slot = slots[name]
  if (slot) {
    // function
    if (typeof slot === 'function') {
      return createVNode('div', {}, slot(props))
    }
  }
}
