import { camelize, toHandlerKey } from '../shared'

export function emit(instance, event, ...args) {
  console.log('emit1', event)

  // instance.props 里面是否有对应的函数
  const { props } = instance

  // TPP 开发技巧
  // 先去写一个特定的行为 ==> 然后在重构成通用的行为
  // 比如传 add
  // add ==> Add
  // add-foo ==> addFoo

  const handlerName = toHandlerKey(camelize(event))
  const handler = props[handlerName]
  handler && handler(...args)
}
