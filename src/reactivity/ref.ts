import { hasChanged } from '../shared'
import { isTracking, trackEffects, triggerEffect } from './effect'

class RefImpl {
  private _value: any

  public dep

  constructor(value) {
    this._value = value
    this.dep = new Set()
  }

  get value() {
    trackRefValue(this)
    return this._value
  }

  set value(newValue) {
    // 步骤一定是先修改了 value 的值，然后才执行依赖触发流程

    // newValue ==> this._value
    // hasChanged
    if (hasChanged(this._value, newValue)) {
      this._value = newValue
      triggerEffect(this.dep)
    }
  }
}

function trackRefValue(ref) {
  if (isTracking()) {
    trackEffects(ref.dep)
  }
}

export function ref(value) {
  return new RefImpl(value)
}
