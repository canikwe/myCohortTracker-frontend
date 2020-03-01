import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons'

const SelectActivityForm = ({ searchTerm, handleSearchTerm, displayedActivities, selectActivity, activity, updateActivity, toggleCreateForm, searchToggle, updateSearchToggle }) => {

  const handleSearchToggle = () => updateSearchToggle(!searchToggle)

  const showSearch = () => {
    updateActivity({})
    handleSearchToggle()
  }

  return (
    <>
    { !searchToggle ?
     <div className='search-container'>
       <div>
          <FontAwesomeIcon icon={faSearch} onClick={showSearch} size="2x" color='grey'/>
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
          {/* <span>
            Create New 
          </span>  */}
          <FontAwesomeIcon icon={faPlus} onClick={toggleCreateForm} size="2x" color='yellowgreen' />
        </div>
      </div>
      : null}

      {activity.id ? <h3>{activity.name}</h3> : null}

       { searchToggle && !activity.id ?
      <>
        <h3>Select Activity</h3>
        <label htmlFor='searchTerm'>Search  </label>
        <input type='text' value={searchTerm} placeholder='E.g. Mod 2 Final Project' onChange={handleSearchTerm} />

        {searchTerm.length && !displayedActivities.length ? (
          <h4>No activity found...</h4>
        ) : (
            <ul>
              {
                displayedActivities.map(a => <li key={a.id} onClick={(e) => {
                  selectActivity(e, a)
                  handleSearchToggle()
                }}>{a.name}</li>)
              }
            </ul>
          )}
        <button className='cancel' onClick={handleSearchToggle}>Cancel</button>

      </> : null
      }

    </>
  )
}

export default SelectActivityForm