import React from 'react'
import { useDispatch, shallowEqual, useSelector } from 'react-redux'
import { updateActiveStudentX, updateActiveStudentY } from '../redux/actions/index'
import { filteredGroups, getMatchedGroups, getStudentGroups } from '../helper/functions'

const Cell = ({ studentX, studentY }) => {
  
  const dispatch = useDispatch()
  const { activeStudentX, activeStudentY, groups } = useSelector(state => ({
    activeStudentX: state.activeStudentX,
    activeStudentY: state.activeStudentY,
    groups: filteredGroups(state)
  }), shallowEqual)

  const studentGroups = getStudentGroups(groups, studentX)
  const matchedGroups =  getMatchedGroups(studentX, studentY, studentGroups)

  const handleClick = () => {
    
    if (studentX === activeStudentX && studentY === activeStudentY) {
      dispatch(updateActiveStudentX(null))
      dispatch(updateActiveStudentY(null))
    } else {
      dispatch(updateActiveStudentX(studentX))
      dispatch(updateActiveStudentY(studentY))
    }
  }

  const generateClassNames = () => {
    const activeStudent = assignActiveStudent()
    const pairs = assignPair()

    return activeStudent + pairs
  }

  const assignActiveStudent = () => {
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

  const assignPair = () => {
    if (!matchedGroups.length) {
      return ''
    } else {
      const projectGroup = matchedGroups.find(g => g.activity.category.toLowerCase() === 'project')

      if (projectGroup) {
        return ' project'
      }
      return ` pair-${matchedGroups.length}`
    }
  }

  return (
    <div
      onClick={handleClick}
      className={`cell${generateClassNames()}`}
    >
      { matchedGroups.map(g => ( 
        <div key={g.id}>
          <span>
            {g.avoid ? '❗️' : null}
            {g.activity.name}
          </span>
        </div>
      )) }
    </div>
  )
}

export default Cell