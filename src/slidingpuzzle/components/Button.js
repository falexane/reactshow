import React from 'react'

const Button = ({text = 'button', color = 'black', onClick}) => {
  return (
    <div className="button" style={{color: color}} onClick={onClick}>
      {text}
    </div>
  )
}

export default Button
