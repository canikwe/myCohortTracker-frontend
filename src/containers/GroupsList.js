import React, { useState } from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import { getStudentGroups, getMatchedGroups, filteredGroups } from '../helper/functions'
import Group from '../components/Group'
import GroupDetails from '../components/GroupDetails'

const GroupsContainer = () => {
  const [selectedGroup, updateSelectedGroup] = useState(undefined)

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
              matchedStudents={matchedStudents}
              openModal={updateSelectedGroup}
            />
          )})
          ) : <p>No groups yet...</p>
        }
      </section>
      <div className='hr-line'></div>
      {selectedGroup ?
        <GroupDetails
          group={selectedGroup}
          students='hello world'
          closeModal={updateSelectedGroup}
        /> : null
      }
    </>
  )
}

export default GroupsContainer
