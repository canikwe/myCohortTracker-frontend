import React from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { showActivitySearch, showActivityCreate, resetSelectedActivity } from '../redux/actions'

const ActivityOptions = () => {

  const { selectedActivity, activitySearchTerm } = useSelector(state => ({
    selectedActivity: state.selectedActivity,
    activitySearchTerm: state.activitySearchTerm
  }), shallowEqual)

  const dispatch = useDispatch()

  // const handleSearchToggle = () => updateSearchToggle(!searchToggle)

  // const showSearch = () => {
  //   updateActivity({})
  //   handleSearchToggle()
  // }

  return (
    <>
      {selectedActivity.id ? 
        <h3>
          <span>
            <FontAwesomeIcon icon={faArrowLeft} onClick={() => dispatch(resetSelectedActivity())} />
          </span>
          {selectedActivity.name}
        </h3>
       : 
      <>
        <h3>Choose an activity</h3>
        <div className='search-container'>
          <div>
            <div>Search</div>
            <FontAwesomeIcon icon={faSearch} onClick={() => dispatch(showActivitySearch())} size="2x" color='grey' />
            {/* <div>
                Search 
              </div> */}
          </div>
          <div className="wrapper">
            <div className="line"></div>
            <div className="wordwrapper">
              <div className="word">or</div>
            </div>
          </div>
          <div>
            <div>Create New</div>
            <FontAwesomeIcon icon={faPlus} onClick={() => dispatch(showActivityCreate(activitySearchTerm))} size="2x" color='yellowgreen' />
          </div>
        </div> 
      </>}
    </>
  )
}

export default ActivityOptions