import React from 'react'
import Group from '../components/Group'

const GroupsContainer = ({ groups, updateGroup, updateActivity, handleDelete, updateFormToggle }) => {
  const handleEdit = (group, activity) => {
    updateGroup(group)
    updateActivity(activity)
    updateFormToggle(true)
  }

  return (
    <section className='group-container'>
      { groups.length ? (
        groups.sort((a,b) => b.activity.mod - a.activity.mod).map(g => (
          <Group
            key={g.id}
            group={g} 
            handleEdit={handleEdit} 
            handleDelete={handleDelete} 
          />
        ))
        ) : <p>No groups yet...</p>
      }
    </section>
  )
}

export default GroupsContainer
