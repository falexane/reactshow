import React, {useState, useEffect, useRef} from 'react'
import Tile from './Tile'

const SlidingPuzzle = ({N, data, onClick}) => {
  const length = data.length
  const cssvarRef = useRef(null)
  const [foo, setFoo] = useState(Date.now())

  useEffect(() => {
    cssvarRef.current.style.setProperty('--N', N)
    setFoo(Date.now())
    // cssvarRef.current.style.setProperty('width', '' + (Math.random() * 20 + 250) + 'px')
    // console.log('SlidingPuzzle width = ', cssvarRef.current.style.getPropertyValue('width'));
    // console.log('SlidingPuzzle change css');
  }, [N])

  useEffect(() => {
    console.log('SlidingPuzzle useEffect');
  })

  return (
    <div ref={cssvarRef} className="checkerboard">
      {/* {cssvarRef.current.style.setProperty('--N', N)} */}
      {
        data.map((number, index) => (
        <Tile key={number} index={index} face={(number === 0)? length : number} onClick={onClick} N={N} />
        ))
      }
    </div>
  )
}

export default SlidingPuzzle
