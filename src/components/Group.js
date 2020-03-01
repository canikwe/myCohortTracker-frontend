import React from 'react'

const Group = ({ group, handleEdit, handleDelete, matchedStudents }) => {
  const formatMatchedStudents = () => {
    switch (matchedStudents.length) {
      case 1:
        return 'Solo'
      case 2:
        return matchedStudents.join(' & ')
      default:
        const last = matchedStudents.pop()
        return `${matchedStudents.join(', ')}, & ${last}`
    }
  }
  return (
    <div className='group'>
      {group.activity.name}
      <span
        onClick={() => handleEdit(group, group.activity)}
        role='img'
        aria-label='writing hand'
      >
        ✍🏾
      </span>
      <span onClick={() => handleDelete(group)}
        role='img'
        aria-label='cross mark'
      >
        ❌
      </span>
      <p className='group-students'>
        {formatMatchedStudents()}
      </p>
    </div>
  )
}

export default Group