/**
 * The data structure of a sliding puzzle (aka NxP-Puzzle, 15 puzzle/8 puzzle) 
 * is implemented as a one-dimensional number array. The "blank" is "0", e.g.,
 * a solved 8 puzzle is represented as [1, 2, 3, 4, 5, 6, 7, 8, 0].
 * 
 * This work gets benefit from the references:
 * https://www.geeksforgeeks.org/check-instance-15-puzzle-solvable/
 * https://www.cs.mcgill.ca/~newborn/nxp_puzzleOct9.htm
 * 
 */

/** The width & height of puzzle. */
const edgeLength = 300
/** The basic font size (pt) */
const fontSizeBase =  12

/**
 * Adding/reducing one inversion on an array. This will make an unsolvable 
 * array solvable and vice versa.
 * 
 * @private
 * @param {number[]} array The array operated.
 */
const adjustInversions = (array) => {
  const length = array.length
  if (array[length - 1] === 0) swap(array, length - 2, length - 3)
  else if (array[length - 2] === 0) swap(array, length - 1, length - 3)
  else swap(array, length - 1, length - 2)
}

/**
 * Calculate how many inversions needed to take on an array to make it 
 * solvable.
 * 
 * @private
 * @param {number[]} array The array operated.
 * @returns {number} Returns the inversions.
 */
const calcInversions = (array) => {
  let inversions = 0
  
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] === 0) continue
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] !== 0 && array[i] > array[j]) inversions++
    }
  }
  
  return inversions 
}

/**
 * Create an array contains continuous ascending numbers. Such array 
 * represents the data of a solved puzzle with dimensions "N x N". 
 * e.g., a 3x3 sliding puzzle holds an array "[1,2,3,4,5,6,7,8,0]". 
 * The last "0" represents the blank position.
 * 
 * @private
 * @param {number} N The counts per dimension of a puzzle.
 * @returns {number[]} Returns a number array.
 */
const createSeries = (N) => {
  const length = N * N
  const array = Array.from({length: length}, (element, index) => (index + 1) % length)

  return array
}

/**
 * Generate a very-easy-grade unsolved puzzle data series.
 * 
 * @public
 * @param {number} N The counts per dimension of a puzzle.
 * @returns {number[]} Returns a number array.
 */
const dumbPuzzle = (N) => {
  switch (N) {
    case 3:
      return [1, 2, 3, 4, 0, 6, 7, 5, 8]
    case 4:
      return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 0, 13, 14, 15]
    case 5:
      return [1, 2, 3, 0, 4, 6, 7, 8, 9, 5, 11, 12, 13, 14, 10, 16, 17, 18, 19, 15, 21, 22, 23, 24, 20]
    default:
      return [1, 2, 3, 4, 0, 6, 7, 5, 8]
  }
}

/**
 * Generate an easy-grade unsolved puzzle data series.
 * 
 * @public
 * @param {number} N The counts per dimension of a puzzle.
 * @returns {number[]} Returns a number array.
 */
const easyPuzzle = (N) => {
  switch (N) {
    case 3:
      return [2, 3, 6, 1, 0, 5, 4, 7, 8]
    case 4:
      return [5, 1, 7, 3, 9, 2, 11, 4, 13, 6, 15, 8, 0, 10, 14, 12]
    case 5:
      return [6, 1, 3, 4, 5, 11, 2, 7, 9, 10, 12, 17, 8, 13, 15, 18, 0, 23, 14, 19, 16, 21, 22, 24, 20]
    default:
      return [2, 3, 6, 1, 0, 5, 4, 7, 8]
  }
}

/**
 * Return the index of element with value 0 of an array.
 *  
 * @public
 * @param {number[]} array The array operated.
 * @returns {number} Returns a number.
 */
const getIndexBlank = (array) => {
  return array.indexOf(0)
}

/**
 * Returns the corresponding index of row which hosts the element 0.
 * 
 * @private
 * @param {number[]} array The array operated.
 * @param {number} N The counts per dimension of a puzzle.
 * @returns {number} Returns a number.
 */
const getRowIndexOfBlank = (array, N) => {
  const indexOfBlank = array.indexOf(0)
  if (indexOfBlank === -1) throw new Error('Invalid puzzle data')
  return Math.floor(indexOfBlank / N)
}

/**
 * Evaluate if two indices stand adjacently in 2-D space context.
 * 
 * @public
 * @param {number} index1 The first index evaluated.
 * @param {number} index2 The second index evaluated.
 * @param {number} N The counts per dimension of a puzzle.
 * @returns {boolean} Returns a boolean value.
 */
const areAdjacent = (index1, index2, N) => {
  // console.log('[blank], [target], N ', index1, index2, N);
  return (
      ((index1 % N) === (index2 % N)) &&
      (Math.abs(Math.floor(index1 / N) - Math.floor(index2 / N)) === 1)
    ) || 
    (
      (Math.floor(index1 / N) === Math.floor(index2 / N)) &&
      (Math.abs((index1 % N) - (index2 % N)) === 1)
    )
}

const isSolved = (array) => {
  const last = array.length -1
  if (array[last] !== 0) return false
  for (let i = last - 1;  i >= 0;  i--) {
    if (array[i] !== i + 1) return false    
  }
  return true
}

/**
 * If N is odd, then puzzle instance is solvable if number of inversions is even in the input state. 
 * If N is even, puzzle instance is solvable if the blank is on an even row counting from the bottom (second-last, fourth-last, etc.) and number of inversions is odd.
 * the blank is on an odd row counting from the bottom (last, third-last, fifth-last, etc.) and number of inversions is even.
 * @param {*} array 
 */
const makeSolvable = (array, N) => {
  const inversions = calcInversions(array)
  // console.log('inversions = ', inversions)
  // console.log('adjust...')
  
  if (N % 2 === 1) {
    if (inversions % 2 === 1) adjustInversions(array)
  } else {
    const RowIndexOfBlank = getRowIndexOfBlank(array, N)
    // console.log('RowIndexOfBlank = ', RowIndexOfBlank)
    if (inversions % 2 === 1) {
      if (RowIndexOfBlank % 2 === 1) adjustInversions(array)
    } else {
      if (RowIndexOfBlank % 2 === 0) adjustInversions(array)
    }
  }

  // console.log('array = ', array)
  // console.log('inversions = ', calcInversions(array))
}

const newPuzzle = (N) => {
  const array = createSeries(N)
  shuffle(array)
  // console.log('array = ', array)
  makeSolvable(array, N)
  return array
}

/**
 * Take Fisher-Yates Shuffle on an array
 * @param {Array} array
 * @returns {void}  
 */
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0 ; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

/**
 * Exchange two elements in an array.
 * 
 * @public
 * @param {number[]} array The array operated.
 * @param {number} index1 An index number.
 * @param {number} index2 An index number.
 */
const swap = (array, index1, index2) => {
  [array[index1], array[index2]] = [array[index2], array[index1]]
}


export {
  edgeLength,
  fontSizeBase,
  // calcInversions,
  // createSeries, 
  dumbPuzzle,
  easyPuzzle,
  getIndexBlank,
  areAdjacent,
  isSolved,
  newPuzzle,
  shuffle,
  swap,
}
