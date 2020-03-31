import React from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { resetSelectedActivity } from '../redux/actions/activities'

const SelectedActivity = () => {

  const { selectedActivity } = useSelector(state => ({
    selectedActivity: state.selectedActivity,
  }), shallowEqual)

  const dispatch = useDispatch()

  return (
    <h3>
      <span>
        <FontAwesomeIcon icon={faArrowLeft} onClick={() => dispatch(resetSelectedActivity())} />
      </span>
      {selectedActivity.name}
    </h3>

  )
}

export default SelectedActivity