import React, { useState } from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { closeActivityCreateForm, creatingActivity } from '../redux/actions/activities'

const ActivityForm = () => {

  
  const { activitySearchTerm } = useSelector(state => ({
    activitySearchTerm: state.activitySearchTerm
  }), shallowEqual)
  
  const [activity, updateActivity] = useState({ name: activitySearchTerm, mod: 1, category: 'lab' })
  const dispatch = useDispatch()

  const handleActivityChange = e => updateActivity({...activity, [e.target.name]: e.target.value})
  const handleActivityCreate = e => {
    e.preventDefault()
    dispatch(creatingActivity(activity))
  }

  return (
    <>
      <h3>Create Activity</h3>
      <form className='activity-form' onSubmit={handleActivityCreate}>
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
          <button className='cancel' onClick={() => dispatch(closeActivityCreateForm())}>Cancel</button>
          <input className='primary' type='submit' value='Create Activity' />
        </div>
      </form>
    </>
  )
}

export default ActivityForm