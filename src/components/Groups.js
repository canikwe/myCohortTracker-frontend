import React from 'react'

const Groups = ({ groups, updateGroup, updateActivity, handleDelete, updateFormToggle }) => {
  const handleEdit = (group, activity) => {
    updateGroup(group)
    updateActivity(activity)
    updateFormToggle(true)
  }

  return (
    <section>
      <ul>
        { groups.length ? (
          groups.sort((a,b) => b.activity.mod - a.activity.mod).map(g => (
            <li key={g.id}>
              {g.activity.name} ---
              <span 
                onClick={() => handleEdit(g, g.activity)} 
                role='img' 
                aria-label='writing hand'
              >
                ✍🏾
              </span>
              <span onClick={() => handleDelete(g)}
              role='img'
              aria-label='cross mark'
              >
                ❌
              </span>
            </li>
          ))
          ) : <p>No pairings yet...</p>
        }
      </ul>
    </section>
  )
}

export default Groups
