export const extend = Object.assign

export const isObject = (val: unknown) => {
  return val !== null && typeof val === 'object'
}

export const hasChanged = (val, newValue) => {
  return !Object.is(val, newValue)
}

export const hasOwn = (val, key) => Object.prototype.hasOwnProperty.call(val, key)

// 转换为 驼峰命名 格式
export const camelize = (str: string) => {
  return str.replace(/-(\w)/g, (_, c: string) => {
    return c ? c.toUpperCase() : ''
  })
}

// 首字母转换成大写
export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// 使用例子 入参str: add  函数返回结果为：onAdd
export const toHandlerKey = (str: string) => {
  return str ? `on${capitalize(str)}` : ''
}
