import React from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import ActivityOptions from '../components/ActivityOptions'
import SearchActivityForm from '../components/SearchActivityForm'

const ActivityContainer = () => {
  const {activityOptions} = useSelector(state => ({
    activityOptions: state.activityOptions
  }), shallowEqual)

  switch (activityOptions) {
    case 2:
      return <SearchActivityForm />
    case 3:
      return <h1>Activity Create!</h1>
    default:
      return <ActivityOptions />
  }
}

export default ActivityContainer