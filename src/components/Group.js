import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit } from '@fortawesome/free-regular-svg-icons'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'

import { useDispatch } from 'react-redux'
import { deletingGroup, selectGroup } from '../redux/actions/group'
import { formatMatchedStudents } from '../helper/functions'


const Group = ({ group, matchedStudents, openModal }) => {

  const dispatch = useDispatch()

  const handleGroupDelete = () => {
    return (
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          dispatch(deletingGroup(group))
        }
      })
    )
  }

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

        <FontAwesomeIcon icon={faTrashAlt} onClick={handleGroupDelete} />
      </div>


    </>
  )
}

export default Group