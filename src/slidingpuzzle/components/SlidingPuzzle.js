import React, {useState, useEffect, useRef} from 'react'
import Tile from './Tile'
import Button from './Button'
import * as Logic from '../Logic'

const edgeLength = Logic.edgeLength
const fontSizeBase = Logic.fontSizeBase

const SlidingPuzzle = ({N = 3}) => {
  // create number series of a 3x3 sliding puzzle by default
  const nRef = useRef(N)
  const [series, setSeries] = useState(Logic.newPuzzle(nRef.current))
  const isSolvedRef = useRef(false)
  const indexBlankRef = useRef(Logic.getIndexBlank(series))  // caching
  const containerRef = useRef(null)
  const cycle345Ref = useRef(3)

  const boardStyle = {
    width: `${edgeLength}px`, 
    height: `${edgeLength}px`
  }
  const anchorStyle = {
    width: `${edgeLength / nRef.current}px`, 
    height: `${edgeLength / nRef.current}px`
  }
  const tileStyle = {
    ...anchorStyle,
    fontSize: `${fontSizeBase / nRef.current}rem`
  }
  
/*   const easyPuzzle = () => {
    // n.current = Math.floor(Math.random() * 3 + 3)  // [3 - 5]
    nRef.current = 3
    isSolvedRef.current = false
    setSeries(Logic.easyPuzzle(nRef.current))
  } */

  const inverse = (indexTarget) => {
    if (Logic.areAdjacent(indexBlankRef.current, indexTarget, nRef.current)) {
      const array = Array.from(series)
      Logic.swap(array, indexBlankRef.current, indexTarget)
      if (Logic.isSolved(array)) {
        isSolvedRef.current = true
        lock(true)
      }
      setSeries(array)
    }
  }

  const newPuzzle = (hint = 3) => {
    if (typeof hint === 'number') {
      nRef.current = hint
    } else {
      nRef.current = cycle345Ref.current
      cycle345Ref.current = ((cycle345Ref.current + 1) % 3) + 3
    }
    
    isSolvedRef.current = false

    switch (hint) {
      case 'easy':
        setSeries(Logic.easyPuzzle(nRef.current))
        break
      case 'dumb':
        setSeries(Logic.dumbPuzzle(nRef.current))
        break
      default:
        setSeries(Logic.newPuzzle(nRef.current))
    }
  }

  const lock = (toLock) => {
    (toLock)? containerRef.current.classList.add('inactive')
      : containerRef.current.classList.remove('inactive')
  }

  // update indexBlank
  useEffect(() => {
    // setIndexBlank(Logic.getIndexBlank(series))
    indexBlankRef.current = Logic.getIndexBlank(series)
  }, [series])

/*   useEffect(() => {
    console.log('SlidingPuzzle useEffect');
  }) */

  return (
    <div ref={containerRef} className="container">
      <div className="board" style={boardStyle}>
        {
          series.map((value, index) => {
            // const face =
            return (
              <Tile key={value} 
                value = {value}
                index={index} 
                N={nRef.current} 
                onClick={(isSolvedRef.current)? null : inverse} 
                face={(value === 0)? series.length : value} 
                anchorStyle={/* (value === 0)? {...anchorStyle, opacity: 0} : */ anchorStyle} 
                /* tileStyle={(value === 0)? {...tileStyle, opacity: 0} : tileStyle} */ 
                tileStyle={tileStyle} 
                isSolved={isSolvedRef.current}
                lock={lock}
              />
              )
          })
        }
      </div>
      <br/>
      {/* <div className="controls"> */}
        <Button text={'3x3'} color={'crimson'} onClick={() => {newPuzzle(3)}} />
        <Button text={'4x4'} color={'goldenrod'} onClick={() => {newPuzzle(4)}} />
        <Button text={'5x5'} color={'green'} onClick={() => {newPuzzle(5)}} />
        <Button text={'easy'} color={'dodgerblue'} onClick={() => {newPuzzle('easy')}} />
        <Button text={'dumb'} color={'royalblue'} onClick={() => {newPuzzle('dumb')}} />
        {/* <button onClick={() => {newPuzzle(3)}}>3 x 3</button>
        <button onClick={() => {newPuzzle(4)}}>4 x 4</button>
        <button onClick={() => {newPuzzle(5)}}>5 x 5</button>
        <br/>
        <button onClick={() => {easyPuzzle()}}>easy</button> */}
      {/* </div> */}
    </div>
  )
}

export default SlidingPuzzle
