import React from 'react'
import Group from '../components/Group'

import { useSelector, shallowEqual } from 'react-redux'


const GroupsContainer = ({ groups, updateGroup, updateActivity, handleDelete, updateGroupFormToggle}) => {

  const { students } = useSelector(state => ({
    students: state.students
  }), shallowEqual)

  const handleEdit = (group, activity) => {
    updateGroup(group)
    updateActivity(activity)
    updateGroupFormToggle(true)
  }

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
              handleEdit={handleEdit} 
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
