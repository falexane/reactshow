import React, {useState, useEffect, useRef} from 'react'
import SlidingPuzzle from './components/SlidingPuzzle'
import * as Logic from './Logic'
import './App.css'


const App = ({N=3}) => {
  // create number series of a 4x4 sliding puzzle by default
  const [series, setSeries] = useState(Logic.newPuzzle(N))
  const n = useRef(N)
  const indexBlank = useRef(Logic.findIndexBlank(series))  // caching
  // const [n, setN] = useState(N)
  // const [indexBlank, setIndexBlank] = useState(/* Logic.findIndexBlank(series) */)

  /* useEffect(() => {
    setSeries(Logic.newPuzzle(n))
  }, [n]) */

  useEffect(() => {
    // setIndexBlank(Logic.findIndexBlank(series))
    indexBlank.current = Logic.findIndexBlank(series)
  }, [series])

  useEffect(() => {
    console.log('App useEffect');
  })

  /* const changeN = (N) => {    
    setN(N)
  } */

  const shuffle = () => {
    const array = Array.from(series)
    Logic.shuffle(array)
    setSeries(array)
  }

  const inverse = (indexTarget) => {
    // const indexBlank = Logic.findIndexBlank(series)
    if (/* indexTarget !== indexBlank && */ Logic.isAdjacent(indexBlank.current, indexTarget, n.current)) {
      const array = Array.from(series)
      Logic.swap(array, indexBlank.current, indexTarget)
      setSeries(array)
      // setIndexBlank(indexTarget)
    }
  }

  const newPuzzle = (N) => {
    n.current = N
    setSeries(Logic.newPuzzle(N))
  }

  return (
    <div className="App">
      <SlidingPuzzle N={n.current} data={series} onClick={inverse} />
      <div style={{width: 400, margin: 'auto'}}>
        <button onClick={() => {newPuzzle(3)}}>3 x 3</button>
        <button onClick={() => {newPuzzle(4)}}>4 x 4</button>
        <button onClick={() => {newPuzzle(5)}}>5 x 5</button>
        <br/>
        <button onClick={() => {shuffle()}}>shuffle</button>
      </div>
    </div>
  )
}

export default App
