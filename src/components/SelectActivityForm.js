import React from 'react'

const SelectActivityForm = ({ searchTerm, handleSearchTerm, displayedActivities, selectActivity, activity, updateActivity, toggleCreateForm }) => {
  return (
    <>
      {activity.id ? <h3>{activity.name}</h3> : 
      <>
        <h3>Select Activity</h3>
        <label htmlFor='searchTerm'>Search  </label>
        <input type='text' value={searchTerm} placeholder='E.g. Mod 2 Final Project' onChange={handleSearchTerm} />

        {searchTerm.length && !displayedActivities.length ? (
          <h4>No activity found...</h4>
        ) : (
            <ul>
              {
                displayedActivities.map(a => <li key={a.id} onClick={(e) => selectActivity(e, a)}>{a.name}</li>)
              }
            </ul>
          )}
      </>
      }
      <div>
        Search Activities <span onClick={() => updateActivity({})} role='img' aria-label='search'>🔍</span>
      </div>
      <div>
        Create New <span onClick={toggleCreateForm} role='img' aria-label='plus'>➕</span>
      </div>
    </>
  )
}

export default SelectActivityForm