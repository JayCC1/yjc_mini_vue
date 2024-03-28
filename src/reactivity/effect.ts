import { extend } from '../shared'

let activeEffect // 当前effect依赖实例对象存储
let shouldTrack // 是否需要进行依赖收集操作
class ReactiveEffect {
  private _fn: any

  deps = []

  active = true

  onStop?: () => void

  public scheduler: Function | undefined

  constructor(fn, scheduler?: Function) {
    this._fn = fn
    this.scheduler = scheduler
  }

  run() {
    activeEffect = this
    // 1.会收集依赖
    //    shouldTrack 来做区分
    //    this.active可以区分当前是否使用了 stop 方法
    if (!this.active) {
      return this._fn()
    }

    shouldTrack = true
    activeEffect = this

    const result = this._fn()
    // reset
    shouldTrack = false

    return result
  }

  stop() {
    if (this.active) {
      cleanupEffect(this)
      if (this.onStop) {
        this.onStop()
      }
      this.active = false
    }
  }
}

function cleanupEffect(effect) {
  effect.deps.forEach((dep: any) => {
    dep.delete(effect)
  })
  effect.deps.length = 0
}

const targetMap = new Map()
export function track(target, key) {
  if (!isTracking()) return

  // target ==> key ==> dep
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }

  let dep = depsMap.get(key)
  if (!dep) {
    dep = new Set()
    depsMap.set(key, dep)
  }

  // 已经在 dep 中，没必要在添加
  if (dep.has(activeEffect)) return
  dep.add(activeEffect)
  activeEffect.deps.push(dep)
}

function isTracking() {
  return shouldTrack && activeEffect !== undefined
}

export function trigger(target, key) {
  const depsMap = targetMap.get(target)
  const dep = depsMap.get(key)

  for (const effect of dep) {
    if (effect.scheduler) {
      effect.scheduler()
    } else {
      effect.run()
    }
  }
}

export function effect(fn, options: any = {}) {
  // fn
  const _effect = new ReactiveEffect(fn, options.scheduler)
  // options 优化前
  // Object.assign(_effect, options);
  // 由于这个函数可以理解为是公共需要使用的函数，且能够更加美化、语义化，所以对方法进行抽离
  extend(_effect, options)

  _effect.run()

  const runner: any = _effect.run.bind(_effect)
  runner.effect = _effect
  return runner
}

export function stop(runner) {
  runner.effect.stop()
}
