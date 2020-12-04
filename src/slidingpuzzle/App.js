import React, {useState} from 'react'
import Pane from './components/Pane'
import Tile from './components/Tile'
import './App.css'
import * as Logic from './Logic'


const App = () => {
  // create number series of a 4x4 sliding puzzle by default
  const [puzzle, setPuzzle] = useState(Logic.newPuzzle(4))
  console.log('puzzle = ', puzzle)
  console.log('inversions = ', Logic.calcInversions(puzzle))

  return (
    <div className="App">
      <Pane>
        {
          puzzle.map((element, index) => (
          <Tile key={index} >{element}</Tile>
          ))
        }
      </Pane>
    </div>
  )
}

export default App
