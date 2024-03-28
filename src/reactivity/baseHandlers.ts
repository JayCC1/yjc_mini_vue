import { extend, isObject } from '../shared'
import { track, trigger } from './effect'
import { ReactiveFlags, reactive, readonly } from './reactive'

// 优化：实际createGetter 函数可以只在初始化时调用一次即可，后续都沿用初始化时创建好的get方法
// 场景：每次使用的时候都会创建一个 get/set 函数
// 可以利用缓存机制，只创建一次
const get = createGetter()
const set = createSetter()
const readonlyGet = createGetter(true)
const shallowReadonlyGet = createGetter(true, true)

function createGetter(isReadonly = false, shallow = false) {
  return function get(target, key) {
    if (key === ReactiveFlags.IS_REACTIVE) {
      return !isReadonly
    }
    if (key === ReactiveFlags.IS_READONLY) {
      return isReadonly
    }
    const res = Reflect.get(target, key)

    if (shallow) {
      return res
    }

    // 深度嵌套对象处理
    // 看看 res 是不是 object
    if (isObject(res)) {
      return isReadonly ? readonly(res) : reactive(res)
    }

    if (!isReadonly) {
      // 依赖收集
      track(target, key)
    }
    return res
  }
}

function createSetter() {
  return function set(target, key, value, receiver) {
    const res = Reflect.set(target, key, value, receiver)
    // 触发依赖
    trigger(target, key)
    return res
  }
}

export const mutableHandlers = {
  get,
  set,
}

export const readonlyHandlers = {
  get: readonlyGet,
  set(target, key, value) {
    console.warn(`${key} set 失败 因为 target 是 readonly`, target)
    return true
  },
}

export const shallowReadonlyHandlers = extend({}, readonlyHandlers, {
  get: shallowReadonlyGet,
})
