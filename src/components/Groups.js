import React from 'react'

const Groups = ({ groups }) => {
  return (
    <section>
      <ul>
        { groups.length ? (
          groups.sort((a,b) => b.activity.mod - a.activity.mod).map(g => <li key={g.id}>{g.activity.name}</li>)
          ) : <p>No pairings yet...</p>
        }
      </ul>
    </section>
  )
}

export default Groups
