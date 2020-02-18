import React from 'react'

const Cell = ({ handleClick, classNames, student, index, matchedGroups }) => {
  if (matchedGroups.length) console.log(matchedGroups)
    return (
      <div
        onClick={() => handleClick(student, index)}
        className={`cell${classNames(student, index)}`}
      >
        { matchedGroups.map(g => <div key={g.id}>{g.activity.name}</div>) }
      </div>
    )
}

export default Cell