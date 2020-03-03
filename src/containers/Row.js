import React from 'react'
import Cell from '../components/Cell'
import { getMatchedGroups } from '../helper/functions'
import { useSelector, shallowEqual } from 'react-redux'

const Row = ({ studentX, allStudents, handleClick, studentGroups }) => {

  const { activeStudentX, activeStudentY } = useSelector(state => ({
    activeStudentX: state.activeStudentX,
    activeStudentY: state.activeStudentY
  }), shallowEqual)

  const generateClassNames = (studentX, studentY, matchedGroups) => {
    const activeStudent = assignActiveStudent(studentX, studentY)
    const pairs = assignPair(matchedGroups)

    return activeStudent + pairs
  }
  
  const assignActiveStudent = (studentX, studentY) => {
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

  const assignPair = groups => {
    if (!groups.length) {
      return ''
    } else {
      const projectGroup = groups.find(g => g.activity.category.toLowerCase() === 'project')

      if (projectGroup) {
        return ' project'
      }
      return ` pair-${groups.length}`
    }
  }
  
  return (
    <section className='row'>
      <div 
        className='cell anchorX'
        onClick={() => handleClick(studentX, null)}
      >
        {studentX.first_name}
      </div>
      {allStudents.map(studentY => {
        const matchedGroups = getMatchedGroups(studentX, studentY, studentGroups)
        const classNames = generateClassNames(studentX, studentY, matchedGroups)

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