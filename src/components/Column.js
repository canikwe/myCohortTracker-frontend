import React from 'react'

const Column = ({ student, allStudents, handleClick }) => {
  return (
    <p onClick={() => handleClick(null, allStudents.indexOf(student))}>{student.first_name}</p>
  )
}

export default Column