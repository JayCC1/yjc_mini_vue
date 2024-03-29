import { isTracking, track, trackEffects, triggerEffect } from './effect'

class RefImpl {
  private _value: any
  public dep

  constructor(value) {
    this._value = value
    this.dep = new Set()
  }

  get value() {
    isTracking() && trackEffects(this.dep)
    return this._value
  }

  set value(newValue) {
    // 步骤一定是先修改了 value 的值，然后才执行依赖触发流程
    if (Object.is(newValue, this._value)) return
    this._value = newValue
    triggerEffect(this.dep)
  }
}

export function ref(value) {
  return new RefImpl(value)
}
