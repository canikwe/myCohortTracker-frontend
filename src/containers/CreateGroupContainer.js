import React from "react"
import ActivityContainer from "./ActivityContainer"
import GroupForm from './GroupForm'

const CreateGroupContainer = () => {
  return (
    <>
      <h3 className='header'>New Pair</h3>
      <ActivityContainer />
      <GroupForm />
    </>
  )
}

export default CreateGroupContainer
