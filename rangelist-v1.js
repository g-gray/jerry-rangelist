// Task: Implement a class named 'RangeList'
// A pair of integers define a range, for example: [1, 5). This range includes integers: 1, 2, 3, and 4.
// A range list is an aggregate of these ranges: [1, 5), [10, 11), [100, 201)

/**
 *
 * NOTE: Feel free to add any extra member variables/functions you like.
 */

const u = require('./utils')

class RangeList {
  constructor() {
    this.ranges = []
  }

  /**
   * Adds a range to the list
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  add(range) {
    u.validateRange(range)

    console.info(`Add range:`, rangeToStr([range[0], range[1] - 1]))

    const valuesToAdd  = u.range(range[0], range[1])
    const flattenVals  = u.flatten(this.ranges)
    const newVals      = u.concat(flattenVals, valuesToAdd)
    const uniqVals     = u.uniq(newVals)
    const sortedVals   = u.sort(uniqVals)
    this.ranges        = splitIntoRanges(sortedVals)
  }

  /**
   * Removes a range from the list
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  remove(range) {
    u.validateRange(range)

    console.info(`Remove range:`, rangeToStr([range[0], range[1] - 1]))

    const valuesToRemove = u.range(range[0], range[1])
    const flattenVals    = u.flatten(this.ranges)
    const newVals        = u.sub(flattenVals, valuesToRemove)
    this.ranges          = splitIntoRanges(newVals)
  }

  /**
   * Prints out the list of ranges in the range list
   */
  print() {
    console.log(this.ranges.map(rangeToStr).join(' '))
  }
}



/**
 * Utils
 */

function splitIntoRanges(array) {
  u.validate(array, u.isArray)
  let out = []
  let temp = [array[0]]
  let i = 1
  while (i < array.length) {
    while (array[i] - array[i - 1] === 1) {
      temp = u.concat(temp, [array[i]])
      i++
    }
    out = u.concat(out, [temp])
    temp = [array[i]]
    i++
  }
  return out
}

function rangeToStr(range) {
  return `[${range[0]} ${range[range.length - 1] + 1})`
}



/**
 * Example run
 */
const rl = new RangeList();

rl.add([1, 5]);
rl.print();
// Should display: [1, 5)

rl.add([10, 20]);
rl.print();
// Should display: [1, 5) [10, 20)

rl.add([20, 20]);
rl.print();
// Should display: [1, 5) [10, 20)

rl.add([20, 21]);
rl.print();
// Should display: [1, 5) [10, 21)

rl.add([2, 4]);
rl.print();
// Should display: [1, 5) [10, 21)

rl.add([3, 8]);
rl.print();
// Should display: [1, 8) [10, 21)

rl.remove([10, 10]);
rl.print();
// Should display: [1, 8) [10, 21)

rl.remove([10, 11]);
rl.print();
// Should display: [1, 8) [11, 21)

rl.remove([15, 17]);
rl.print();
// Should display: [1, 8) [11, 15) [17, 21)

rl.remove([3, 19]);
rl.print();
// Should display: [1, 3) [19, 21)
