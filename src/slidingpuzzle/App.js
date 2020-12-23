import React, {useState, useEffect, useRef} from 'react'
import SlidingPuzzle from './components/SlidingPuzzle'
// import * as Logic from './Logic'
import './App.css'
import './components/SlidingPuzzle.css'


const App = () => {
  // create number series of a 4x4 sliding puzzle by default
  // const [series, setSeries] = useState(Logic.newPuzzle(N))
  // const n = useRef(N)
  // const isSolved = useRef(false)
  // const indexBlank = useRef(Logic.findIndexBlank(series))  // caching

  // const [n, setN] = useState(N)
  // const [indexBlank, setIndexBlank] = useState(/* Logic.findIndexBlank(series) */)

  /* useEffect(() => {
    setSeries(Logic.newPuzzle(n))
  }, [n]) */


/*   useEffect(() => {
    console.log('App useEffect');
  }) */

/*   const easy = (N) => {
    n.current = N
    setSeries(Logic.easyPuzzle())
  }

  const newPuzzle = (N) => {
    n.current = N
    setSeries(Logic.newPuzzle(N))
  }
 */
  return (
    <div className="App">
      <SlidingPuzzle />
      {/* <div style={{width: 400, margin: 'auto'}}>
        <button onClick={() => {newPuzzle(3)}}>3 x 3</button>
        <button onClick={() => {newPuzzle(4)}}>4 x 4</button>
        <button onClick={() => {newPuzzle(5)}}>5 x 5</button>
        <br/>
        <button onClick={() => {easy(3)}}>easy</button>
      </div> */}
    </div>
  )
}

export default App
