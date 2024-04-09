export function emit(instance, event, ...args) {
  console.log('emit1', event)

  // instance.props 里面是否有对应的函数
  const { props } = instance

  // TPP 开发技巧
  // 先去写一个特定的行为 ==> 然后在重构成通用的行为
  // 比如传 add
  // add ==> Add
  // add-foo ==> addFoo

  // 转换为 驼峰命名 格式
  const camelize = (str: string) => {
    return str.replace(/-(\w)/g, (_, c: string) => {
      return c ? c.toUpperCase() : ''
    })
  }

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  const toHandlerKey = (str: string) => {
    return str ? 'on' + capitalize(str) : ''
  }

  const handlerName = toHandlerKey(camelize(event))
  const handler = props[handlerName]
  handler && handler(...args)
}
