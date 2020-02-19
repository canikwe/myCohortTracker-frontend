import React from 'react'
import Cell from './Cell'

const Row = ({ studentX, allStudents, handleClick, activeStudentX, activeStudentY, studentGroups }) => {
  console.log(`updating ${studentX.first_name}`)

  const generateClassNames = (studentX, studentY) => {
    if (studentX === activeStudentX) {
      return ' active-student'
    }
    if (studentY === activeStudentY) {
      return ' active-student'
    }
    if (studentX === studentY) {
      return ' same-student'
    }
    return ''
  }

  const getMatchedGroups = studentY => {
    return studentGroups.filter(g => {
      if (g.student_ids.length === 1 && studentY === studentX) {
        return g.student_ids[0] === studentX.id
      }
      return studentY !== studentX && g.student_ids.includes(studentY.id) && g.student_ids.includes(studentX.id) 
    })
  }
  
  return (
    <>
      <p 
        className='cell anchorX'
        onClick={() => handleClick(studentX, null)}
      >
        {studentX.first_name}
      </p>
      {allStudents.map(studentY => {
        const matchedGroups = getMatchedGroups(studentY)
        const classNames = generateClassNames(studentX, studentY)

        return (
          <Cell
            key={studentY.id}
            handleClick={handleClick}
            classNames={classNames}
            studentX={studentX}
            studentY={studentY}
            matchedGroups={matchedGroups}
          />
        )}
      )}
    </>
  )
}

export default Row