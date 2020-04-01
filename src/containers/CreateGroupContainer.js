import React from "react"
import {useSelector, shallowEqual} from 'react-redux'
import ActivityContainer from "./ActivityContainer"
import GroupForm from './GroupForm'

const CreateGroupContainer = () => {
  const {group} = useSelector(state => ({
    group: state.selectedGroup
  }), shallowEqual)
  
  return (
    <>
      <h3 className='header'>{group.id ? 'Update' : 'New'} Pair</h3>
      <ActivityContainer />
      <GroupForm />
    </>
  )
}

export default CreateGroupContainer
