import React from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons'

const SelectActivityForm = ({ searchTerm, handleSearchTerm, displayedActivities, selectActivity, activity, searchToggle, updateSearchToggle }) => {

  const handleSearchToggle = () => updateSearchToggle(!searchToggle)

  return (
    <>
      {/* {activity.id ? <h3>{activity.name}</h3> : null} */}
        <h3>Select Activity</h3>
        <label htmlFor='searchTerm'>Search  </label>
        <input 
          type='text' 
          value={searchTerm} 
          placeholder='E.g. Mod 2 Final Project' 
          onChange={handleSearchTerm}
        />

        {searchTerm.length && !displayedActivities.length ? (
          <h4>No activity found...</h4>
        ) : (
            <ul>
              {
                displayedActivities.map(a => <li key={a.id} onClick={(e) => {
                  selectActivity(e, a)
                  handleSearchToggle()
                }}>{`${a.name} (${a.mod})`}</li>)
              }
            </ul>
          )}
        <button className='cancel' onClick={handleSearchToggle}>Cancel</button>
      
    </>
  )
}

export default SelectActivityForm