const edgeLength = 300
const fontSizeBase =  12

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
 * @param {number} N the count of tiles per dimension
 * @returns {number[]} an array of numbers
 */
const createSeries = (N) => {
  const length = N * N
  const array = Array.from({length: length}, (element, index) => (index + 1) % length)

  return array
}

const easyPuzzle = (N) => {
  switch (N) {
    case 3:
      // return [2, 3, 6, 1, 0, 5, 4, 7, 8]
      return [1, 2, 3, 4, 5, 6, 0, 7, 8]
    case 4:
      return [5, 1, 7, 3, 9, 2, 11, 4, 13, 6, 15, 8, 0, 10, 14, 12]
    case 5:
      return [6, 1, 3, 4, 5, 11, 2, 7, 9, 10, 12, 17, 8, 13, 15, 18, 0, 23, 14, 19, 16, 21, 22, 24, 20]
    default:
      return [1, 2, 3, 4, 5, 6, 0, 7, 8]
  }
}

const findIndexBlank = (array) => {
  return array.indexOf(0)
}

const getRowIndexOfBlank = (array, N) => {
  const indexOfBlank = array.indexOf(0)
  if (indexOfBlank === -1) throw new Error('Invalid puzzle data')
  return Math.floor(indexOfBlank / N)
}

const isAdjacent = (index1, index2, N) => {
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

const swap = (array, index1, index2) => {
  [array[index1], array[index2]] = [array[index2], array[index1]]
}


export {
  edgeLength,
  fontSizeBase,
  createSeries, 
  calcInversions,
  easyPuzzle,
  findIndexBlank,
  isAdjacent,
  isSolved,
  newPuzzle,
  shuffle,
  swap,
}
