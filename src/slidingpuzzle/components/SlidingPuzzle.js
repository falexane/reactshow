import React, {useState, useEffect, useRef} from 'react'
import Tile from './Tile'
import * as Logic from '../Logic'

const edgeLength = 300
const fontSizeBase =  12

const SlidingPuzzle = ({N = 3}) => {
  // create number series of a 3x3 sliding puzzle by default
  const n = useRef(N)
  const [series, setSeries] = useState(Logic.newPuzzle(n.current))
  const isSolved = useRef(false)
  const indexBlank = useRef(Logic.findIndexBlank(series))  // caching

  const boardStyle = {
    width: `${edgeLength}px`, 
    height: `${edgeLength}px`
  }
  const anchorStyle = {
    width: `${edgeLength / n.current}px`, 
    height: `${edgeLength / n.current}px`
  }
  const tileStyle = {
    // ...anchorStyle,
    fontSize: `${fontSizeBase / n.current}rem`
  }
  
  const easyPuzzle = () => {
    // n.current = Math.floor(Math.random() * 3 + 3)  // [3 - 5]
    n.current = 3
    isSolved.current = false
    setSeries(Logic.easyPuzzle(n.current))
  }

  const inverse = (indexTarget) => {
    if (Logic.isAdjacent(indexBlank.current, indexTarget, n.current)) {
      const array = Array.from(series)
      Logic.swap(array, indexBlank.current, indexTarget)
      if (Logic.isSolved(array)) isSolved.current = true
      setSeries(array)
    }
  }

  const newPuzzle = (N) => {
    n.current = N
    isSolved.current = false
    setSeries(Logic.newPuzzle(N))
  }

  // update indexBlank
  useEffect(() => {
    // setIndexBlank(Logic.findIndexBlank(series))
    indexBlank.current = Logic.findIndexBlank(series)
  }, [series])

/*   useEffect(() => {
    console.log('SlidingPuzzle useEffect');
  }) */

  return (
    <div className="container">
      <div className="board" style={boardStyle}>
        {
          series.map((value, index) => {
            // const face =
            return (
              <Tile key={value} 
                value = {value}
                index={index} 
                N={n.current} 
                onClick={(isSolved.current)? null : inverse} 
                face={(value === 0)? series.length : value} 
                anchorStyle={/* (value === 0)? {...anchorStyle, opacity: 0} : */ anchorStyle} 
                tileStyle={(value === 0)? {...tileStyle, opacity: 0} : tileStyle} 
                isSolved={isSolved.current}
              />
              )
          })
        }
      </div>
      <div className="controls">
        <button onClick={() => {newPuzzle(3)}}>3 x 3</button>
        <button onClick={() => {newPuzzle(4)}}>4 x 4</button>
        <button onClick={() => {newPuzzle(5)}}>5 x 5</button>
        <br/>
        <button onClick={() => {easyPuzzle()}}>easy</button>
      </div>
    </div>
  )
}

export default SlidingPuzzle
