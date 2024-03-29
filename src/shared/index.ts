export const extend = Object.assign

export const isObject = (val: unknown) => {
  return val !== null && typeof val === 'object'
}

export const hasChanged = (val, newValue) => {
  return !Object.is(val, newValue)
}
