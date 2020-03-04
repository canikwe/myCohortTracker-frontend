import React, { useState, useEffect } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { CirclePicker } from 'react-color'
import { getStudentGroups, getMatchedGroups, filteredGroups } from '../helper/functions'
import { BASE_URL } from '../redux/actions/constants'
import GroupsContainer from './GroupsContainer'
import GroupForm from './GroupForm'
import CreateActivityForm from '../components/CreateActivityForm'
import SelectActivityForm from '../components/SelectActivityForm'
import ActivityOptions from '../components/ActivityOptions'

const SideBar = ({ handleSubmit, deleteGroup, updateActivities }) => {
  const [groupFormToggle, updateGroupFormToggle] = useState(false)
  const [searchTerm, updateSearchTerm] = useState('')
  const [activity, updateActivity] = useState({})
  const [group, updateGroup] = useState(initialGroupState())
  const [createFormToggle, updateCreateFormToggle] = useState(false)
  const [searchToggle, updateSearchToggle] = useState(false)

  const { activeStudentX, activeStudentY, groups, activities } = useSelector(state => ({
    activeStudentX: state.activeStudentX,
    activeStudentY: state.activeStudentY,
    groups: filteredGroups(state),
    activities: state.activities
  }), shallowEqual)

  function resetGroupState(){
    return ({ ...initialGroupState(), activity_date: group.activity_date, student_ids: [] })
  }

  function initialGroupState(){
    return ({ notes: '', avoid: false, student_ids: [], activity_date: new Date().toISOString().slice(0, 10) })
  }

  useEffect(() => {
    if (localStorage.hue) {
      const root = document.querySelector(':root')
      root.style.setProperty('--hue', localStorage.hue)
    }
  }, [])

  useEffect(() => {
    if (activeStudentX && activeStudentX === activeStudentY) {
      updateGroup(g => ({ ...initialGroupState(), activity_date: g.activity_date, student_ids: [activeStudentX.id] }))
    } else if (activeStudentX && activeStudentY) {
      updateGroup(g => ({ ...initialGroupState(), activity_date: g.activity_date, student_ids: [activeStudentX.id, activeStudentY.id] }))
    } else if (activeStudentX) {
      updateGroup(g => ({ ...initialGroupState(), activity_date: g.activity_date, student_ids: [activeStudentX.id] }))
    } else if (activeStudentY) {
      updateGroup(g => ({ ...initialGroupState(), activity_date: g.activity_date, student_ids: [activeStudentY.id] }))
    } else {
      updateGroup(g => ({ ...initialGroupState(), activity_date: g.activity_date, student_ids: [] }))
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
    const id = parseInt(e.target.id)

    if (group.student_ids.includes(id)) {
      const student_ids = group.student_ids.filter(i => i !== id)
      updateGroup({ ...group, student_ids })
    } else {
      const student_ids = [...group.student_ids, id]
      updateGroup({ ...group, student_ids })
    }
  }

// ❗️❗️❗️❗️❗️ This needs to update two pieces of state
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
    updateCreateFormToggle(!createFormToggle)
    updateSearchToggle(false)
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
    toggleCreateForm()
    createActivity({ activity })
  }

  const handleChangeComplete = (color) => {
    const root = document.querySelector(':root')
    root.style.setProperty('--hue', color.hsl.h)
    localStorage.setItem('hue', color.hsl.h)
  }

  const closeForm = () => {
    updateGroupFormToggle(false)
    updateCreateFormToggle(false)
    updateActivity({})
    updateGroup(initialGroupState())
  }

  return (
    <aside className='sidebar'>
      {groupFormToggle ? <div className='header'>
        <span>
          <FontAwesomeIcon 
            icon={faArrowLeft}
            onClick={closeForm}
          /> 
          Go back
        </span> 
      </div> : null }
         
      {
        activeStudentX || activeStudentY ?
        <GroupsContainer
          groups={displayedGroups()}
          updateGroup={updateGroup}
          updateActivity={updateActivity}
          updateGroupFormToggle={updateGroupFormToggle}
        />
        : <h3 className='header'>Choose a Group</h3>
      }
      
      {!createFormToggle && groupFormToggle && !searchToggle ? 
        <ActivityOptions
          updateActivity={updateActivity}
          toggleCreateForm={toggleCreateForm}
          updateSearchToggle={updateSearchToggle}
          searchToggle={searchToggle}
          activity={activity}
        /> : null}


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
        :
        <button className='secondary' onClick={() => updateGroupFormToggle(true)}>New Pair</button>
      }

      <div className='color-selector'>
        <label htmlFor='color-selector'>Set Theme</label>
        <CirclePicker onChangeComplete={handleChangeComplete}/>
      </div>
    </aside>
  )
}

export default SideBar