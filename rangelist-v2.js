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
    console.info(`Add range:`, rangeToStr(range))

    const indexesToRemove = []
    let   indexToInsert   = 0

    for (let i = 0; i < this.ranges.length; i++) {
      const r = this.ranges[i]

      /**
       * range---******---      range----****----
       * r    ----****----  or  r    ----****----
       */
      if (range[0] <= r[0] && r[1] <= range[1]) {
        indexesToRemove.push(i)
        continue
      }

      /**
       * range----****----
       * r    ---******---
       */
      if (r[0] < range[0] && range[1] < r[1]) {
        range = [r[0], r[1]]
        indexesToRemove.push(i)
        continue
      }

      /**
       * range----****---      range----***----
       * r    ---****----  or  r    ---****----
       */
      if (r[0] < range[0] && range[0] <= r[1] && r[1] <= range[1]) {
        range = [r[0], range[1]]
        indexesToRemove.push(i)
        continue
      }

      /**
       * range---****----      range----***----
       * r    ----****---  or  r    ----****---
       */
      if (range[0] <= r[0] && r[0] <= range[1] && range[1] < r[1]) {
        range=[range[0], r[1]]
        indexesToRemove.push(i)
        continue
      }

      indexToInsert = i
    }

    if (indexesToRemove.length) {
      const minIndex = Math.min(indexesToRemove)
      const maxIndex = Math.max(indexesToRemove)

      const head = this.ranges.slice(0, minIndex)
      const body = [range]
      const tail = this.ranges.slice(maxIndex + 1)

      this.ranges = u.concat(u.concat(head, body), tail)
    } else {
      const head = this.ranges.slice(0, indexToInsert + 1)
      const body = [range]
      const tail = this.ranges.slice(indexToInsert + 2)

      this.ranges = u.concat(u.concat(head, body), tail)
    }
  }

  /**
   * Removes a range from the list
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  remove(range) {
    u.validateRange(range)

    console.info(`Remove range:`, rangeToStr(range))

    const filteredRanges = []

    for (let i = 0; i < this.ranges.length; i++) {
      const r = this.ranges[i]

      /**
       * range---******---      range----****----
       * r    ----****----  or  r    ----****----
       */
      if (range[0] <= r[0] && range[1] >= r[1]) {
        continue
      }

      /**
       * range----****----
       * r    ---******---
       */
      if (r[0] < range[0] && range[1] < r[1]) {
        filteredRanges.push([r[0], range[0]])
        filteredRanges.push([range[1], r[1]])
        continue
      }

      /**
       * range----****---      range----***----
       * r    ---****----  or  r    ---****----
       */
      if (r[0] < range[0] && range[0] <= r[1] && r[1] <= range[1]) {
        filteredRanges.push([r[0], range[0]])
        continue
      }

      /**
       * range---****----      range----***----
       * r    ----****---  or  r    ----****---
       */
      if (range[0] <= r[0] && r[0] <= range[1] && range[1] < r[1]) {
        filteredRanges.push([range[1], r[1]])
        continue
      }

      filteredRanges.push(r)
    }

    this.ranges = filteredRanges
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

function rangeToStr(range) {
  return `[${range[0]} ${range[range.length - 1]})`
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
