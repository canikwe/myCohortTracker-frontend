import React from 'react'

const Cell = ({ handleClick, classNames, studentX, studentY, matchedGroups }) => {
  if (matchedGroups.length) console.log(matchedGroups)
    return (
      <div
        onClick={() => handleClick(studentX, studentY)}
        className={`cell${classNames}`}
      >
        { matchedGroups.map(g => <div key={g.id}>{g.activity.name}</div>) }
      </div>
    )
}

export default Cell