import React from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import SelectedActivity from '../components/SelectedActivity'
import SearchActivityForm from '../components/SearchActivityForm'
import CreateActivityForm from '../components/CreateActivityForm'

const ActivityContainer = () => {
  const { showNewActivityForm, selectedActivity} = useSelector(state => ({
    showNewActivityForm: state.newActivityToggle,
    selectedActivity: state.selectedActivity
  }), shallowEqual)

  if (selectedActivity.id) {
    return <SelectedActivity />
  } else if (showNewActivityForm) {
    return <CreateActivityForm />    
  } else {
    return <SearchActivityForm />
  }
}

export default ActivityContainer