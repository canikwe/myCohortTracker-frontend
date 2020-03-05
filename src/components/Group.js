import React from 'react'
import GroupDetails from './GroupDetails'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit } from '@fortawesome/free-regular-svg-icons'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

import { useDispatch } from 'react-redux'
import { deletingGroup, selectGroup } from '../redux/actions/group'


const Group = ({ group, handleEdit, matchedStudents }) => {
  const dispatch = useDispatch()

  const formatMatchedStudents = () => {
    switch (matchedStudents.length) {
      case 1:
        return 'Solo'
      case 2:
        return matchedStudents.join(' & ')
      default:
        const last = matchedStudents.pop()
        return `${matchedStudents.join(', ')}, & ${last}`
    }
  }

  return (
    <>
      <div className='group'>
        <span>
          {group.avoid ? <FontAwesomeIcon icon={faExclamationTriangle} /> : null}
          {group.activity.name}
        </span>

        <FontAwesomeIcon icon={faEdit} onClick={() => dispatch(selectGroup(group))} />

        <FontAwesomeIcon icon={faTrashAlt} onClick={() => dispatch(deletingGroup(group))} />

        <p className='group-students'>
          {formatMatchedStudents()}
        </p>
        <GroupDetails
          group={group}
          students={formatMatchedStudents()} 
        />  
      </div>


    </>
  )
}

export default Group