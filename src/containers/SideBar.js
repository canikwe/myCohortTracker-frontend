import React, { useState, useEffect } from 'react'
import Groups from '../components/Groups'
import Form from './Form'
import { getStudentGroups, getMatchedGroups } from '../helper/functions'
import ActivityForm from './ActivityForm'
import SelectActivityForm from '../components/SelectActivityForm'

const SideBar = ({ students, handleSubmit, activeStudentX, activeStudentY, groups, activities, deleteGroup, updateActivities, BASE_URL }) => {
  const [formToggle, updateFormToggle] = useState(false)
  const [searchTerm, updateSearchTerm] = useState('')
  const [activity, updateActivity] = useState({})
  const [group, updateGroup] = useState(resetGroupState())
  const [createFormToggle, updateToggle] = useState(false)

  function resetGroupState(){
    return ({ notes: '', avoid: false, student_ids: [] })
  } 

  useEffect(() => {
    if (activeStudentX && activeStudentX === activeStudentY) {
      updateGroup(g => ({ ...g, student_ids: [activeStudentX.id] }))
    } else if (activeStudentX && activeStudentY) {
      updateGroup(g => ({ ...g, student_ids: [activeStudentX.id, activeStudentY.id] }))
    } else if (activeStudentX) {
      updateGroup(g => ({ ...g, student_ids: [activeStudentX.id] }))
    } else if (activeStudentY) {
      updateGroup(g => ({ ...g, student_ids: [activeStudentY.id] }))
    }
  }, [activeStudentX, activeStudentY])

  const submitForm = e => {
    e.preventDefault()
    if (activity.id) {

      const data = { group: {...group, activity_id: activity.id} }

      handleSubmit(data)
      updateGroup(resetGroupState())
    } else {
      alert('Please choose or create a new activity')
    }
  }

  const handleSelection = e => {
    const id = parseInt(e.target.value)

    if (group.student_ids.includes(id)) {
      const student_ids = group.student_ids.filter(i => i !== id)
      updateGroup({ ...group, student_ids })
    } else {
      const student_ids = [...group.student_ids, id]
      updateGroup({ ...group, student_ids })
    }
  }

  const handleDelete = group => {
    deleteGroup(group)
    updateGroup(resetGroupState())
  }

  const selectActivity = (e, activity) => {
    updateSearchTerm(activity.name)
    updateActivity(activity)
  }

  const displayedActivities = () => {
    if (searchTerm === '') {
      return []
    } else {
      return activities.filter(a => a.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }
  }

  const toggleCreateForm = () => {
    updateToggle(!createFormToggle)
    updateActivity({ name: searchTerm, mod: 1, category: '' })
  }

  const handleActivityChange = e => {
    updateActivity({ ...activity, [e.target.name]: e.target.value })
  }

  const handleSearchTerm = e => {
    updateSearchTerm(e.target.value)
    if (!activity.id) updateActivity({ ...activity, name: searchTerm })
  }

  const displayedGroups = () => {
    if (activeStudentX && activeStudentY) {
      return getMatchedGroups(activeStudentX, activeStudentY, groups)
    } else if (activeStudentX && !activeStudentY) {
      return getStudentGroups(groups, activeStudentX)
    } else if (activeStudentY && !activeStudentX) {
      return getStudentGroups(groups, activeStudentY)
    } else {
      return []
    }
  }

  const createActivity = data => {
    console.log(data)
    fetch(BASE_URL + 'activities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 'Accepted': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(activity => {
      updateActivities(activities => [...activities, activity])
      updateActivity(activity)
    })
  }

  const handleCreateActivity = e => {
    e.preventDefault()
    // console.log(activity)
    toggleCreateForm()
    createActivity({ activity })
  }

  return (
    <aside className='sidebar'>
      <h3>Pairings</h3>
      {
        activeStudentX || activeStudentY ?
        <Groups 
          groups={displayedGroups()}
          updateGroup={updateGroup}
          updateActivity={updateActivity}
          handleDelete={handleDelete}
          updateFormToggle={updateFormToggle}
        />
        : null
      }

      {
        createFormToggle ? (
        <ActivityForm 
          handleActivityChange={handleActivityChange} 
          activity={activity} 
          handleCreateActivity={handleCreateActivity}
          toggleCreateForm={toggleCreateForm}
          updateToggle={updateToggle}
          createFormToggle={createFormToggle}
        />) : null
      }

      {
        formToggle && !createFormToggle ? (
        <SelectActivityForm 
          searchTerm={searchTerm}
          handleSearchTerm={handleSearchTerm}
          displayedActivities={displayedActivities()}
          selectActivity={selectActivity}
          activity={activity}
          updateActivity={updateActivity}
          toggleCreateForm={toggleCreateForm}

        />) : null
      }

      {
        formToggle ? 
        <Form 
          students={students} 
          handleSelection={handleSelection}
          // searchTerm={searchTerm}
          // handleSearchTerm={handleSearchTerm}
          // displayedActivities={displayedActivities()}
          // selectActivity={selectActivity}
          handleActivityChange={handleActivityChange}
          group={group}
          updateGroup={updateGroup}
          submitForm={submitForm}
          updateFormToggle={updateFormToggle}
          createFormToggle={createFormToggle}
          toggleCreateForm={updateToggle}
          updateActivity={updateActivity}
        />
        :
        <button onClick={() => updateFormToggle(true)}>New Pair</button>
      }

    </aside>
  )
}

export default SideBar