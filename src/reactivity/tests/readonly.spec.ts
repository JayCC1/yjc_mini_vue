import { isReadonly, readonly } from '../reactive'

describe('readonly', () => {
  it('happy path', () => {
    // only get,not set

    const original = { foo: 1, bar: { baz: 2 } }
    const wrapped = readonly(original)
    expect(wrapped).not.toBe(original)
    expect(isReadonly(wrapped)).toBe(true)
    expect(isReadonly(original)).toBe(false)
    expect(isReadonly(wrapped.bar)).toBe(true)
    expect(isReadonly(original.bar)).toBe(false)
    expect(wrapped.foo).toBe(1)
  })

  it('warn then call set', () => {
    // 使用console.warn 抛出警告
    // mock 测试 console.warn 是否有调用到
    console.warn = jest.fn()

    const user = readonly({
      age: 10,
    })

    user.age = 11
    expect(console.warn).toBeCalled()
  })
})
