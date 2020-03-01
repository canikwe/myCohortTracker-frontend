import React from 'react'
import Group from '../components/Group'

const GroupsContainer = ({ groups, updateGroup, updateActivity, handleDelete, updateFormToggle, students }) => {
  const handleEdit = (group, activity) => {
    updateGroup(group)
    updateActivity(activity)
    updateFormToggle(true)
  }

  return (
    <section className='group-container'>
      { groups.length ? (
        groups.sort((a,b) => b.activity.mod - a.activity.mod).map(g => {
          const matchedStudents = g.student_ids.map(id => students.find(s => s.id === id).first_name)
          
          return (<Group
            key={g.id}
            group={g} 
            handleEdit={handleEdit} 
            handleDelete={handleDelete}
            matchedStudents={matchedStudents}
          />
        )})
        ) : <p>No groups yet...</p>
      }
    </section>
  )
}

export default GroupsContainer
