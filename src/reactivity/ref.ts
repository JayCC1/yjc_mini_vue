import { hasChanged, isObject } from '../shared'
import { isTracking, trackEffects, triggerEffect } from './effect'
import { reactive } from './reactive'

// ref 和 reactive 的核心差别
// ref 主要还是处理 单值(基本数据类型，如：1、true、"1")
// get set
// proxy ==> object,而proxy 主要针对的还是对象
// 所以重写了 Ref ==> value，针对 value 实现了 get 和 set
//

class RefImpl {
  private _value: any

  private _rawValue: any

  public __v_isRef = true

  public dep

  constructor(value) {
    this._rawValue = value
    this._value = convert(value)
    // value is Object ==> reactive
    // 1. 看看 value 是不是 对象
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
    // 对比的时候
    // 如果 value 是一个 Object 对象，则 this._value 则是经过 reactive 包装之后的 proxy 对象
    // 而此时的 newValue 则是没有经过包装的 Object 对象
    // 所以需要拿到未被 reactive 包装过的值，因此声明一个 _rawValue 进行存储
    if (hasChanged(this._rawValue, newValue)) {
      this._rawValue = newValue
      this._value = convert(newValue)
      triggerEffect(this.dep)
    }
  }
}

function convert(value) {
  return isObject(value) ? reactive(value) : value
}

function trackRefValue(ref) {
  if (isTracking()) {
    trackEffects(ref.dep)
  }
}

export function ref(value) {
  return new RefImpl(value)
}

export function isRef(ref) {
  return !!ref.__v_isRef
}

export function unRef(ref) {
  // 看看是不是 ref
  // true: return ref.value
  // false: return ref
  return isRef(ref) ? ref._rawValue : ref
}

export function proxyRefs(objectWithRefs) {
  return new Proxy(objectWithRefs, {
    get(target, key, receiver) {
      // 测试逻辑梳理
      // get ==> age(if is ref) 那么就返回 .value
      // if not ref 则返回 value
      return unRef(Reflect.get(target, key, receiver))
    },
    set(target, key, value) {
      // set ==> age(if is ref) 那么就修改 .value 的值
      const oldValue = target[key]
      if (isRef(oldValue) && !isRef(value)) {
        oldValue.value = value
        return true
      }
      return Reflect.set(target, key, value)
    },
  })
}
