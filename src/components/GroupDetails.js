import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

const GroupDetails = ({ group, students }) => {
  return (
    <div className='group-details'>
      <h3>
        <span>
          {group.avoid ? <FontAwesomeIcon icon={faExclamationTriangle} /> : null}
          {group.activity.name}
        </span>
      </h3>
      <p>With: {students}</p>
      
      <div>{new Date(group.activity_date).toDateString()}</div>

      {
        group.notes ?
          <>
            <div>NOTES: </div>
            <p>{group.notes}</p>
          </>
          :
          <div>No notes here</div>
      }
    </div>
  )
}

export default GroupDetails