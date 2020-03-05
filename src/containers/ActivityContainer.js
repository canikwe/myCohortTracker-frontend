import React from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import ActivityOptions from '../components/ActivityOptions'
import SearchActivityForm from '../components/SearchActivityForm'
import CreateActivityForm from '../components/CreateActivityForm'

const ActivityContainer = () => {
  const {activityOptions} = useSelector(state => ({
    activityOptions: state.activityOptions
  }), shallowEqual)

  switch (activityOptions) {
    case 2:
      return <SearchActivityForm />
    case 3:
      return <CreateActivityForm />
    default:
      return <ActivityOptions />
  }
}

export default ActivityContainer