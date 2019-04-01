exports.validateRange = validateRange
function validateRange(range) {
  validate(range, isArray)
  validate(range, r => r.length === 2)
  validate(range, r => isInteger(r[0]))
  validate(range, r => isInteger(r[1]))
  validate(range, r => r[0] <= r[1])
}

exports.range = range
function range(start, end) {
  let remaining = end - start
  const out = Array(remaining) // Throws an error when array length < 0
  while (--remaining >= 0) out[remaining] = start + remaining
  return out
}

exports.flatten = flatten
function flatten(array) {
  validate(array, isArray)
  return array.reduce((acc, subArray) => concat(acc, subArray), [])
}

exports.uniq = uniq
function uniq(array) {
  validate(array, isArray)
  return array.reduce((acc, value) => {
    return includes(acc, value)
      ? acc
      : concat(acc, [value])
  }, [])
}

exports.concat = concat
function concat(a, b) {
  validate(a, isArray)
  validate(b, isArray)
  return a.concat(b)
}

exports.includes = includes
function includes(array, value) {
  validate(array, isArray)
  return array.indexOf(value) !== -1
}

exports.sort = sort
function sort (array) {
  validate(array, isArray)
  return array.sort((a, b) => a - b)
}

exports.sub = sub
function sub(a, b) {
  validate(a, isArray)
  validate(b, isArray)
  return a.filter(value => !includes(b, value))
}

exports.validate = validate
function validate(value, test) {
  if (!isFunction(test)) throw Error(`Expected function, got ${show(test)}`)
  if (!test(value)) throw Error(`Expected ${show(value)} to satisfy test ${show(test)}`)
}

exports.show = show
function show(value) {
  return (
    isFunction(value) && value.name
    ? value.name
    : isArray(value)
    ? JSON.stringify(value)
    : String(value)
  )
}

exports.isArray = isArray
function isArray(value) {
  return isInstance(value, Array)
}

exports.isInstance = isInstance
function isInstance(value, Class) {
  return isComplex(value) && value instanceof Class
}

exports.isComplex = isComplex
function isComplex(value) {
  return isObject(value) || isFunction(value)
}

exports.isObject = isObject
function isObject(value) {
  return value !== null && typeof value === 'object'
}

exports.isFunction = isFunction
function isFunction(value) {
  return typeof value === 'function'
}

exports.isNumber = isNumber
function isNumber(value) {
  return typeof value === 'number'
}

exports.isInteger = isInteger
function isInteger(value) {
  return isNumber(value) && ((value % 1) === 0)
}
