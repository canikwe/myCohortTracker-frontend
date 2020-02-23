import React, { useState, useEffect } from 'react'
import Groups from '../components/Groups'
import Form from './Form'
import { getStudentGroups, getMatchedGroups } from '../helper/functions'

const SideBar = ({ students, handleSubmit, activeStudentX, activeStudentY, groups, activities, deleteGroup }) => {
  const [formToggle, updateFormToggle] = useState(false)
  const [studentIds, updateStudentIds] = useState([])
  const [searchTerm, updateSearchTerm] = useState('')
  const [activity, updateActivity] = useState({})
  const [group, updateGroup] = useState({ notes: '', avoid: false })
  const [createFormToggle, updateToggle] = useState(false)


  useEffect(() => {
    if (activeStudentX && activeStudentY) {
      updateStudentIds([activeStudentX.id, activeStudentY.id])
    } else if (activeStudentX) {
      updateStudentIds([activeStudentX.id])
    } else if (activeStudentY) {
      updateStudentIds([activeStudentY.id])
    }
  }, [activeStudentX, activeStudentY])

  const submitForm = e => {
    e.preventDefault()
    if (activity.name) {
      const data = { activity, group: {...group, student_ids: studentIds} }
  
      handleSubmit(data)
      updateGroup({ notes: '', avoid: false })
    } else {
      alert('Please choose or create a new activity')
    }
  }

  const handleSelection = e => {
    const id = parseInt(e.target.value)

    if (studentIds.includes(id)) {
      updateStudentIds(studentIds.filter(i => i !== id))
    } else {
      updateStudentIds([...studentIds, id])
    }
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
    updateActivity({ name: searchTerm })
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

  return (
    <aside className='sidebar'>
      <h3>Pairings</h3>
      {
        activeStudentX || activeStudentY ?
        <Groups 
          groups={displayedGroups()}
          updateGroup={updateGroup}
          updateActivity={updateActivity}
          updateStudentIds={updateStudentIds}
          deleteGroup={deleteGroup}
        />
        : null
      }
      {
        formToggle ? 
        <Form 
          students={students} 
          handleSelection={handleSelection}
          studentIds={studentIds}
          searchTerm={searchTerm}
          handleSearchTerm={handleSearchTerm}
          displayedActivities={displayedActivities()}
          selectActivity={selectActivity}
          handleActivityChange={handleActivityChange}
          group={group}
          updateGroup={updateGroup}
          submitForm={submitForm}
          updateFormToggle={updateFormToggle}
          createFormToggle={createFormToggle}
          toggleCreateForm={toggleCreateForm}
        />
        :
        <button onClick={() => updateFormToggle(true)}>New Pair</button>
      }

    </aside>
  )
}

export default SideBar