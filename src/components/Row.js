import React from 'react'
import Cell from './Cell'

const Row = ({ student, allStudents, handleClick, activeStudent, crossStudentIndex, groups }) => {
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

  const getMatchedGroups = crossStudent => {
    return groups.filter(g => {
      return g.student_ids.includes(crossStudent.id) && g.student_ids.includes(student.id)
    })
  }
  

  return (
    <>
      <p 
        className='cell anchor'
        onClick={() => handleClick(student, null)}
      >{student.first_name}
      </p>
      {allStudents.map((s, i) => {
        const matchedGroups = getMatchedGroups(s)


        return (
          <Cell
            key={s.id}
            handleClick={handleClick}
            classNames={generateClassNames}
            student={student}
            index={i}
            matchedGroups={matchedGroups}
          />
        )
      }
      )}
    </>
  )
}

export default Row