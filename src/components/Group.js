import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit } from '@fortawesome/free-regular-svg-icons'

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
    <div className='group'>
      {group.activity.name}

      <FontAwesomeIcon icon={faEdit} onClick={() => handleEdit(group, group.activity)} />

      <FontAwesomeIcon icon={faTrashAlt} onClick={() => handleDelete(group)} />
      <p className='group-students'>
        {formatMatchedStudents()}
      </p>
    </div>
  )
}

export default Group