import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

const GroupDetails = ({ group, students, closeModal }) => {
  const handleWindowClick = e => e.target.className === 'modal' ? closeModal(undefined) : null

  return (
    <div className='modal' onClick={handleWindowClick}>
      <div className='group-details modal-content'>
        <div className='header'>
          <span className="close" onClick={() => closeModal(undefined)}>&times;</span>
          <h3>
            <span>
              {group.avoid ? <FontAwesomeIcon icon={faExclamationTriangle} /> : null}
              {group.activity.name}
            </span>
          </h3>

        </div>
        <div className='body'>
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
      </div>
    </div>
  )
}

export default GroupDetails