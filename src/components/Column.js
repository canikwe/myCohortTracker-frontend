import React from 'react'

const Column = ({ studentY, handleClick }) => {
  return (
    <div 
      className='cell header' 
      onClick={() => handleClick(null, studentY)}
      >
        {studentY.first_name}
      </div>
  )
}

export default Column