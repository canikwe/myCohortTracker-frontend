import React from 'react'

const Column = ({ student, allStudents, handleClick }) => {
  return (
    <div className='cell header' onClick={() => handleClick(null, allStudents.indexOf(student))}>{student.first_name}</div>
  )
}

export default Column