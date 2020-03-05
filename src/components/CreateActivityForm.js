import React from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { changeActivityForm, closeActivityCreateForm, creatingActivity } from '../redux/actions/activities'

const ActivityForm = ({ handleCreateActivity, toggleCreateForm }) => {

  const { activity } = useSelector(state => ({
    activity: state.selectedActivity
  }), shallowEqual)

  const dispatch = useDispatch()

  const handleActivityChange = e => dispatch(changeActivityForm(e))
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