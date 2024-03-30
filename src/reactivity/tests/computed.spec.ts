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
})
