import React from 'react'

const SelectActivityForm = ({ searchTerm, handleSearchTerm, displayedActivities, selectActivity, activity, updateActivity, toggleCreateForm, searchToggle, updateSearchToggle }) => {

  const handleSearchToggle = () => updateSearchToggle(!searchToggle)
  return (
    <>
    { !searchToggle ?
     <>
        <span>
          Search <span onClick={() => {
            updateActivity({})
            handleSearchToggle()
            }} role='img' aria-label='search'>🔍</span>
        </span>
        <span>
          Create New <span onClick={toggleCreateForm} role='img' aria-label='plus'>➕</span>
        </span> 
      </>
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
        <button onClick={handleSearchToggle}>Cancel</button>

      </> : null
      }

    </>
  )
}

export default SelectActivityForm