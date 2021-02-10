import React, {useState, useEffect, useRef} from 'react'
import * as Logic from '../Logic'

const Tile = ({value, index, N, onClick, face, anchorStyle, tileStyle, isSolved, lock}) => {
  // const [index/* , setIndex */] = useState(props.index)
  const anchorRef = useRef(null)
  const tileRef = useRef(null)

  useEffect(() => {
    // const content = tileRef.current;
    // content.style.position = "absolute";
    const anchorRect = anchorRef.current.getBoundingClientRect()
    const baseRect = anchorRef.current.parentNode.getBoundingClientRect()
    // console.log(anchorRef.current.parentNode.className); // correct
    // console.log('anchorRef top left: ', anchorRect.top, anchorRect.left);
    // console.log(anchorRect.top, baseRect.top);
    // console.log(anchorRect.left, baseRect.left);
    tileRef.current.style.top = `${anchorRect.top - baseRect.top - 5}px`
    tileRef.current.style.left = `${anchorRect.left - baseRect.left - 5}px`
    // tileRef.current.style.width = `${anchorRect.width}px`
    // tileRef.current.style.height = `${anchorRect.height}px`
    // if (value === 0 && !isSolved) tileRef.current.style.opacity = 0
    // if (value === 0 && isSolved) tileRef.current.style.opacity = 1
    // if (value === 0) tileRef.current.style.opacity = (isSolved)? 1 : 0 // ok
    if (value === 0 && isSolved) {
      tileRef.current.classList.remove('invisible')
      // tileRef.current.classList.add('invisible')
      // tileRef.current.classList.remove('invisible')
    }
    // if (value === 0 ) console.log('value, face, index, isSolved, tileStyle = ', value, face, index, isSolved, tileStyle);

    if (isSolved) setTimeout(() => {
      tileRef.current.style.top = `${anchorRect.top - baseRect.top - 80}px`
    }, 800 + 100 * value)
    if (isSolved) setTimeout(() => {
      tileRef.current.style.top = `${Logic.edgeLength}px`
      if (value === 0) setTimeout(() => {
        lock(false)
      }, 1000 + 250 * N * N);
    }, 1000 + 250 * value)
  }/* , [index, N] */)

/*   useEffect(() => {
    console.log(`Tile[${index}] ${face} useEffect N=`, N);
  }) */

  return (
    <div ref={anchorRef} className="anchor" style={anchorStyle} 
      onClick={(onClick)? () => onClick(index) : null}>
      <div ref={tileRef} className={(value === 0)? (isSolved)? "tile" : "tile invisible" : "tile"} style={tileStyle}>
        {face}
      </div>
    </div>
  )
}

export default Tile
