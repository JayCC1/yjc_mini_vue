import { isReadonly, shallowReadonly } from '../reactive'

describe('shallowReadonly', () => {
  test('should not make non-reactive properties reactive', () => {
    const props = shallowReadonly({ n: { foo: 1 } })
    expect(isReadonly(props)).toBe(true)
    expect(isReadonly(props.n)).toBe(false)
  })

  it('warn then call set', () => {
    // 使用console.warn 抛出警告
    // mock 测试 console.warn 是否有调用到
    console.warn = jest.fn()

    const user = shallowReadonly({
      age: 10,
    })

    user.age = 11
    expect(console.warn).toBeCalled()
  })
})
