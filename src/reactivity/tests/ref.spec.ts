import { effect } from '../effect'
import { reactive } from '../reactive'
import { isRef, proxyRefs, ref, unRef } from '../ref'

describe('ref', () => {
  it('happy path', () => {
    const a = ref(1)
    expect(a.value).toBe(1)
  })

  it('should be reactive', () => {
    const a = ref(1)
    let dummy
    let calls = 0
    effect(() => {
      calls++
      dummy = a.value
    })
    expect(calls).toBe(1)
    expect(dummy).toBe(1)
    a.value = 2
    expect(calls).toBe(2)
    expect(dummy).toBe(2)
    // same value should not trigger
    a.value = 2
    expect(calls).toBe(2)
    expect(dummy).toBe(2)
  })

  it('should make nested properties reactive', () => {
    const a = ref({
      count: 1,
    })
    let dummy
    effect(() => {
      dummy = a.value.count
    })
    expect(dummy).toBe(1)
    // a.value.count = 2
    a.value = { count: 2 }
    expect(dummy).toBe(2)
  })

  it('isRef', () => {
    const a = ref(1)
    const user = reactive({
      age: 1,
    })
    expect(isRef(a)).toBe(true)
    expect(isRef(1)).toBe(false)
    expect(isRef(user)).toBe(false)
  })

  it('unRef', () => {
    const a = ref(1)
    const user = {
      age: 1,
    }
    const userRef = ref(user)
    expect(unRef(a)).toBe(1)
    expect(unRef(1)).toBe(1)
    expect(userRef).not.toBe(user)
    expect(unRef(userRef)).toBe(user)
  })

  it('proxyRefs', () => {
    // 使用场景如:
    // vue3 中的 template
    // 例：const A = ref(1)
    // template 中使用 A的值,是直接写 <span>{{A}}</span> 的，而不是 A.value

    const user = {
      age: ref(10),
      name: 'xiaohong',
    }

    // get 相关逻辑单侧
    // 测试逻辑梳理
    // get ==> age(if is ref) 那么就返回 .value
    // if not ref 则返回 value
    const proxyUser = proxyRefs(user)
    expect(user.age.value).toBe(10)
    expect(proxyUser.age).toBe(10)
    expect(proxyUser.name).toBe('xiaohong')

    // set 相关逻辑单侧
    // set ==> age(if is ref) 那么就修改 .value 的值
    proxyUser.age = 20
    expect(proxyUser.age).toBe(20)
    expect(user.age.value).toBe(20)

    proxyUser.age = ref(10)
    expect(proxyUser.age).toBe(10)
    expect(user.age.value).toBe(10)
  })
})
