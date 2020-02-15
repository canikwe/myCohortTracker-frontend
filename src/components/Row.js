import React from 'react'

const Row = ({ student, allStudents, handleClick, activeStudent, crossStudentIndex }) => {
  console.log(handleClick)

  const studentIndex = () => allStudents.indexOf(student)

  const generateClassNames = (student, i) => {
    if (student === activeStudent) {
      return 'active-student'
    }
    if (i === crossStudentIndex) {
      return 'active-student'
    }
    if (studentIndex() === i) {
      return 'same-student'
    }
  }

  

  return (
    <>
      <p 
        className='anchor'
        onClick={() => handleClick(student, null)}
      >{student.first_name}
      </p>
      {allStudents.map((s, i) => (
        <p 
          key={s.id} 
          onClick={() => handleClick(student, i)}
          className={generateClassNames(student, i)}
        >
          {student.pairs.map(p => {
            if (p.second_student_id === s.id) {
              return p.name
            } else {
              return ''
            }
            })
          }
        </p>
        )
      )}
    </>
  )
}

export default Row