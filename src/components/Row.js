import React from 'react'
import Cell from './Cell'
import { getMatchedGroups } from '../helper/functions'

const Row = ({ studentX, allStudents, handleClick, activeStudentX, activeStudentY, studentGroups }) => {

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
  
  return (
    <section className='row'>
      <p 
        className='cell anchorX'
        onClick={() => handleClick(studentX, null)}
      >
        {studentX.first_name}
      </p>
      {allStudents.map(studentY => {
        const matchedGroups = getMatchedGroups(studentX, studentY, studentGroups)
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
    </section>
  )
}

export default Row