import React from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

const Cell = ({ handleClick, classNames, studentX, studentY, matchedGroups }) => {

  return (
    <div
      onClick={() => handleClick(studentX, studentY)}
      className={`cell${classNames}`}
    >
      { matchedGroups.map(g => ( 
        <div key={g.id}>
          <span>
            {g.avoid ? '❗️' : null}
            {g.activity.name}
          </span>
        </div>
      )) }
    </div>
  )
}

export default Cell