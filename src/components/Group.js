import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit } from '@fortawesome/free-regular-svg-icons'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

import { useDispatch } from 'react-redux'
import { deletingGroup, selectGroup } from '../redux/actions/group'
import { formatMatchedStudents } from '../helper/functions'


const Group = ({ group, matchedStudents, openModal }) => {

  const dispatch = useDispatch()

  return (
    <>
      <div className='group'>
        <span>
          {group.avoid ? <FontAwesomeIcon icon={faExclamationTriangle} /> : null}
          <div onClick={() => openModal(group)}>
            { group.activity.name }
            <p className='group-students'>
              {formatMatchedStudents(matchedStudents)}
            </p>
          </div>
        </span>
        
        <FontAwesomeIcon icon={faEdit} onClick={() => dispatch(selectGroup(group))} />

        <FontAwesomeIcon icon={faTrashAlt} onClick={() => dispatch(deletingGroup(group))} />
      </div>


    </>
  )
}

export default Group