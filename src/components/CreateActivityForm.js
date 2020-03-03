import React from 'react'

const ActivityForm = ({ handleActivityChange, activity, handleCreateActivity, toggleCreateForm }) => {
  return (
    <>
      <h3>Create Activity</h3>
      <form className='activity-form' onSubmit={handleCreateActivity}>
        <div>
          <label htmlFor='name'>Name: </label>
          <input type='text' name='name' value={activity.name} onChange={handleActivityChange} />
        </div>

        <div>
          <label htmlFor='category'>Category: </label>
          <select
            name='category'
            onChange={handleActivityChange}
            value={activity.category}
          >
            <option value='lab'>Lab</option>
            <option value='project'>Project</option>
          </select>
        </div>

        <div>
          <label htmlFor='mod'>Mod: </label>
          <input type='number' name='mod' value={activity.mod} onChange={handleActivityChange} min='1' max='5' />
        </div>
        
        <div>
          <button className='cancel' onClick={toggleCreateForm}>Cancel</button>
          <input className='primary' type='submit' value='Create Activity' />
        </div>
      </form>
    </>
  )
}

export default ActivityForm