import React from 'react'

const ColumnHeader = ({ studentY, handleClick }) => {
  return (
    <div 
      className='cell anchorY' 
      onClick={() => handleClick(null, studentY)}
    >
      {studentY.first_name}
    </div>
  )
}

export default ColumnHeader