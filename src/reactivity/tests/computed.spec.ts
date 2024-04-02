import { computed } from '../computed'
import { reactive } from '../reactive'

describe('computed', () => {
  it('happy path', () => {
    // 和 ref 功能很类似
    // 也都是通过 .value 进行调用
    // 但是 computed 有一个强大的 缓存 功能
    const user = reactive({
      age: 1,
    })

    const age = computed(() => {
      return user.age
    })
    expect(age.value).toBe(1)
  })

  it('should compute lazily', () => {
    // 流程思路：
    // 场景： cValue--computed包装的属性；getter--computed执行的逻辑；value--响应式对象；
    // 1.懒加载
    // 如果没有地方使用过 cValue，则 getter 一直不会被调用，尽管内部所依赖的响应式对象value已修改过很多次
    // 2.当有一处地方使用过cValue后，则getter也就会被
    const value = reactive({
      foo: 1,
    })
    const getter = jest.fn(() => {
      return value.foo
    })
    const cValue = computed(getter)

    // lazy
    expect(getter).not.toHaveBeenCalled()

    expect(cValue.value).toBe(1)
    expect(getter).toHaveBeenCalledTimes(1)

    // // should not compute again
    let val = cValue.value
    expect(getter).toHaveBeenCalledTimes(1)

    // // should not compute until needed
    value.foo = 2 // 会调用 trigger ==> effect ==> get
    expect(getter).toHaveBeenCalledTimes(1)

    // // now it should compute
    expect(cValue.value).toBe(2)
    expect(getter).toHaveBeenCalledTimes(2)

    // // should not compute again
    val = cValue.value
    expect(getter).toHaveBeenCalledTimes(2)
  })
})
