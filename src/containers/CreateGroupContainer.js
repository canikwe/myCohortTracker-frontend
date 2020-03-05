import React from "react"
import ActivityContainer from "./ActivityContainer"
import GroupForm from './GroupForm'

const CreateGroupContainer = () => {
  return (
    <>
      <h1>Group Container </h1>
      <ActivityContainer />
      <GroupForm />
    </>
  )
}

export default CreateGroupContainer

/*
{
!createFormToggle && groupFormToggle && !searchToggle ?
  <ActivityOptions
    updateActivity={updateActivity}
    toggleCreateForm={toggleCreateForm}
    updateSearchToggle={updateSearchToggle}
    searchToggle={searchToggle}
    activity={activity}
  /> : null
}


{
  createFormToggle ? (
    <CreateActivityForm
      handleActivityChange={handleActivityChange}
      activity={activity}
      handleCreateActivity={handleCreateActivity}
      toggleCreateForm={toggleCreateForm}
      createFormToggle={createFormToggle}
    />) : null
}

{
  groupFormToggle && searchToggle && !createFormToggle ? (
    <SelectActivityForm
      searchTerm={searchTerm}
      handleSearchTerm={handleSearchTerm}
      displayedActivities={displayedActivities()}
      selectActivity={selectActivity}
      activity={activity}
      searchToggle={searchToggle}
      updateSearchToggle={updateSearchToggle}

    />) : null
}

{
  groupFormToggle ?
    <GroupForm
      handleSelection={handleSelection}
      group={group}
      updateGroup={updateGroup}
      submitForm={submitForm}
    />
*/