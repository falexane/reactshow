const adjustInversions = (array) => {
  const length = array.length
  if (array[length - 1] === 0) swap(array, length - 2, length - 3)
  else if (array[length - 2] === 0) swap(array, length - 1, length - 3)
  else swap(array, length - 1, length - 2)
}

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
 * Create an array of ascending numbers. It represents the data of a "solved" sliding puzzle with dimensions "count x count". e.g. For a 3x3 sliding puzzle it creates an array "[1,2,3,4,5,6,7,8,0]". The last "0" represent a blank cell. 
 * @param {number} count the count of tiles per dimension
 * @returns {number[]} an array of numbers
 */
const createSeries = (count) => {
  const length = count * count
  const array = Array.from({length: length}, (element, index) => (index + 1) % length)

  return array
}

const getRowIndexOfBlank = (array, N) => {
  const indexOfBlank = array.indexOf(0)
  if (indexOfBlank === -1) throw new Error('Invalid puzzle data')
  return Math.floor(indexOfBlank / N)
}

/**
 * If N is odd, then puzzle instance is solvable if number of inversions is even in the input state. 
 * If N is even, puzzle instance is solvable if the blank is on an even row counting from the bottom (second-last, fourth-last, etc.) and number of inversions is odd.
 * the blank is on an odd row counting from the bottom (last, third-last, fifth-last, etc.) and number of inversions is even.
 * @param {*} array 
 */
const makeSolvable = (array, N) => {
  const inversions = calcInversions(array)
  console.log('inversions = ', inversions)
  console.log('adjust...')
  
  if (N % 2 === 1) {
    if (inversions % 2 === 1) adjustInversions(array)
  } else {
    const RowIndexOfBlank = getRowIndexOfBlank(array, N)
    console.log('RowIndexOfBlank = ', RowIndexOfBlank)
    if (inversions % 2 === 1) {
      if (RowIndexOfBlank % 2 === 1) adjustInversions(array)
    } else {
      if (RowIndexOfBlank % 2 === 0) adjustInversions(array)
    }
  }

  console.log('array = ', array)
  console.log('inversions = ', calcInversions(array))
}

const newPuzzle = (N) => {
  const array = createSeries(N)
  shuffle(array)
  console.log('array = ', array)
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

const swap = (array, index1, index2) => {
  [array[index1], array[index2]] = [array[index2], array[index1]]
}


export {
  createSeries, 
  newPuzzle,
  calcInversions,
}