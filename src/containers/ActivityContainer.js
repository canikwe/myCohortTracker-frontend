import React from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import ActivityOptions from '../components/ActivityOptions'

const ActivityContainer = () => {
  const {activityOptions} = useSelector(state => ({
    activityOptions: state.activityOptions
  }), shallowEqual)

  switch (activityOptions) {
    case 2:
      return <h1>Activity Search</h1>
    case 3:
      return <h1>Create Activity Form</h1>
    default:
      return (
        <ActivityOptions
          // updateActivity={updateActivity}
          // toggleCreateForm={toggleCreateForm}
          // updateSearchToggle={updateSearchToggle}
          // searchToggle={searchToggle}
          // activity={activity}
        />
      )
  }
}

export default ActivityContainer