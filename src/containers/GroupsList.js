import React from 'react'
import Group from '../components/Group'
import { getStudentGroups, getMatchedGroups, filteredGroups } from '../helper/functions'

import { useSelector, shallowEqual } from 'react-redux'


const GroupsContainer = () => {

  const { students, groups } = useSelector(state => {
    const { activeStudentX, activeStudentY, students } = state
    const groups = filteredGroups(state)

    const displayedGroups = () => {
      if (activeStudentX && activeStudentY) {
        return getMatchedGroups(activeStudentX, activeStudentY, groups)
      } else if (activeStudentX && !activeStudentY) {
        return getStudentGroups(groups, activeStudentX)
      } else if (activeStudentY && !activeStudentX) {
        return getStudentGroups(groups, activeStudentY)
      } else {
        return []
      }
    }
    
    return ({
      students: students,
      groups: displayedGroups(),
    })
  }, shallowEqual)

  return (
    <>
      <h3 className='header'>
        Groups
      </h3>
      <section className='group-container'>
        { groups.length ? (
          groups.sort((a,b) => b.activity.mod - a.activity.mod).map(g => {
            const matchedStudents = g.student_ids.map(id => students.find(s => s.id === id).first_name)
            
            return (<Group
              key={g.id}
              group={g} 
              // handleEdit={handleEdit} 
              matchedStudents={matchedStudents}
            />
          )})
          ) : <p>No groups yet...</p>
        }
      </section>
      <div className='hr-line'></div>
    </>
  )
}

export default GroupsContainer
