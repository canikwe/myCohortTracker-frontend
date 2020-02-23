import React from 'react'

const Cell = ({ handleClick, classNames, studentX, studentY, matchedGroups }) => {
  const selectStudent = (x, y) => {
    if (x === y) {
      handleClick(studentX)
    } else {
      handleClick(studentX, studentY)
    }
  }

  return (
    <div
      onClick={() => selectStudent(studentX, studentY)}
      className={`cell${classNames}`}
    >
      { matchedGroups.map(g => <div key={g.id}>{g.activity.name}</div>) }
    </div>
  )
}

export default Cell