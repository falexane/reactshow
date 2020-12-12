import React, {useState, useEffect, useRef} from 'react'

const Tile = ({index, face, onClick, N}) => {
  // const [index/* , setIndex */] = useState(props.index)
  const seatRef = useRef(null)
  const tileRef = useRef(null)

  useEffect(() => {
    // const content = tileRef.current;
    // content.style.position = "absolute";
    const seatRect = seatRef.current.getBoundingClientRect()
    const baseRect = seatRef.current.parentNode.getBoundingClientRect()
    // console.log(seatRef.current.parentNode.className); // correct
    console.log('seatRef top left: ', seatRect.top, seatRect.left);
    // console.log(seatRect.top, baseRect.top);
    // console.log(seatRect.left, baseRect.left);
    tileRef.current.style.top = `${seatRect.top - baseRect.top - 5}px`
    tileRef.current.style.left = `${seatRect.left - baseRect.left - 5}px`
    // tileRef.current.style.width = `${seatRect.width}px`
    // tileRef.current.style.height = `${seatRect.height}px`
  }, [index, N])

  useEffect(() => {
    console.log(`Tile[${index}] ${face} useEffect N=`, N);
  })

  return (
    <div ref={seatRef} className="tile-seat" onClick={() => onClick(index)}>
      <div ref={tileRef} className="tile">
        {face}
      </div>
    </div>
  )
}

export default Tile
