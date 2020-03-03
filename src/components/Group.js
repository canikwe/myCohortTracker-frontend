import React from 'react'
import GroupDetails from './GroupDetails'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit } from '@fortawesome/free-regular-svg-icons'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'


const Group = ({ group, handleEdit, handleDelete, matchedStudents }) => {
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

        <FontAwesomeIcon icon={faEdit} onClick={() => handleEdit(group, group.activity)} />

        <FontAwesomeIcon icon={faTrashAlt} onClick={() => handleDelete(group)} />

        <p className='group-students'>
          {formatMatchedStudents()}
        </p>
      </div>

      <GroupDetails group={group} students={formatMatchedStudents()} />  

    </>
  )
}

export default Group