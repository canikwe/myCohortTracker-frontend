import React from 'react'

const Groups = ({ groups, updateGroup }) => {
  return (
    <section>
      <ul>
        { groups.length ? (
          groups.sort((a,b) => b.activity.mod - a.activity.mod).map(g => (
            <React.Fragment key={g.id}>
              <li>{g.activity.name}</li><span onClick={() => updateGroup(g)}>✍🏾</span>
            </React.Fragment>
          ))
          ) : <p>No pairings yet...</p>
        }
      </ul>
    </section>
  )
}

export default Groups
