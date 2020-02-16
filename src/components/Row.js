import React from 'react'
import Cell from './Cell'

const Row = ({ student, allStudents, handleClick, activeStudent, crossStudentIndex }) => {
  console.log(`updating ${student.first_name}`)

  const studentIndex = () => allStudents.indexOf(student)

  const generateClassNames = (student, i) => {
    if (student === activeStudent) {
      return ' active-student'
    }
    if (i === crossStudentIndex) {
      return ' active-student'
    }
    if (studentIndex() === i) {
      return ' same-student'
    }
    return ''
  }

  const getPairs = s => {
    return student.pairs.filter(p => p.second_student_id === s.id)
  }
  

  return (
    <>
      <p 
        className='anchor'
        onClick={() => handleClick(student, null)}
      >{student.first_name}
      </p>
      {allStudents.map((s, i) => {
        const pairs = getPairs(s, i)

        return (
          <Cell
            handleClick={handleClick}
            classNames={generateClassNames}
            student={student}
            index={i}
            pairs={pairs}
          />
        )
      }
      )}
    </>
  )
}

export default Row