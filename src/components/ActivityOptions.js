import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons'

const ActivityOptions = ({ updateActivity, toggleCreateForm, updateSearchToggle, searchToggle }) => {

  const handleSearchToggle = () => updateSearchToggle(!searchToggle)

  const showSearch = () => {
    updateActivity({})
    handleSearchToggle()
  }

  return (
    <>
      <h3>Choose an activity</h3>
      <div className='search-container'>
        <div>
          <div>Search</div>
          <FontAwesomeIcon icon={faSearch} onClick={showSearch} size="2x" color='grey' />
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
          <FontAwesomeIcon icon={faPlus} onClick={toggleCreateForm} size="2x" color='yellowgreen' />
        </div>
      </div>
    </>
  )
}

export default ActivityOptions