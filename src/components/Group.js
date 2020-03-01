import React from 'react'

const Group = ({ group, handleEdit, handleDelete }) => {
  return (
    <div className='group'>
      {group.activity.name} ---
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
    </div>
  )
}

export default Group