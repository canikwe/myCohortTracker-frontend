import React, { useState, useEffect } from 'react'

const Form = ({ students, handleSelection, studentIds, searchTerm, handleSearchTerm, displayedActivities, selectActivity, handleActivityChange, group, updateGroup, submitForm, updateFormToggle, createFormToggle, toggleCreateForm }) => {

  // const [studentIds, updateStudentIds] = useState([])
  // const [searchTerm, updateSearchTerm] = useState('')
  // const [activity, updateActivity] = useState({})
  // const [group, updateGroup] = useState({notes: '', avoid: false})
  // const [createFormToggle, updateToggle] = useState(false)

  // useEffect(() => {
  //   if (activeStudentX && activeStudentY) {
  //     updateStudentIds([activeStudentX.id, activeStudentY.id])
  //   } else if (activeStudentX) {
  //     updateStudentIds([activeStudentX.id])
  //   } else if (activeStudentY) {
  //     updateStudentIds([activeStudentY.id])
  //   }
  // }, [activeStudentX, activeStudentY])

  // const submitForm = e => {
  //   e.preventDefault()
  //   const data = { activity, group, student_group: { student_ids: studentIds } }

  //   handleSubmit(data)
  // }

  // const handleSelection = e => {
  //   const id = parseInt(e.target.value)

  //   if (studentIds.includes(id)) {
  //     updateStudentIds(studentIds.filter(i => i !== id))
  //   } else {
  //     updateStudentIds([...studentIds, id])
  //   }
  // }

  // const selectActivity = (e, activity) => {
  //   updateSearchTerm(activity.name)
  //   updateActivity(activity)
  // }

  // const displayedActivities = () => {
  //   if (searchTerm === '') {
  //     return []
  //   } else {
  //     return activities.filter(a => a.name.toLowerCase().includes(searchTerm.toLowerCase()))
  //   }
  // }

  // const toggleCreateForm = () => {
  //   updateToggle(!createFormToggle)
  //   updateActivity({ name: searchTerm })
  // }

  // const handleActivityChange = e => {
  //   // debugger
  //   updateActivity({ ...activity, [e.target.name]: e.target.value })
  // }

  // const handleSearchTerm = e => {
  //   updateSearchTerm(e.target.value)
  //   if (!activity.id) updateActivity({ ...activity, name: searchTerm })
  // }

  return (
    <>
      <button onClick={() => updateFormToggle(false)}>Go Back</button>
      <h3>Select Activity</h3>
      <label htmlFor='searchTerm'>Search: </label>
      <input type='text' value={searchTerm} placeholder='E.g. Mod 2 Final Project' onChange={handleSearchTerm} />
      <div>
        Create New <span onClick={toggleCreateForm}>➕</span>
      </div>
      <ul>
        {
          displayedActivities.map(a => <li key={a.id} onClick={(e) => selectActivity(e, a)}>{a.name}</li>)
        }
      </ul>

      {searchTerm.length && !displayedActivities.length ? (
        <h4>No activity found...</h4>
      ) : null}

      {createFormToggle ? (
        <>
          <div>
            <label htmlFor='category'>Category: </label><input type='text' name='category' onChange={handleActivityChange} />
          </div>
          <div>
            <label htmlFor='mod'>Mod: </label><input type='number' name='mod' onChange={handleActivityChange} min='1' max='5' />
          </div>
        </>
      ) : null}

      <form onSubmit={submitForm}>
        <div>
          <h4>Students</h4>
            {
              students.map(s => {
                return (
                  <div key={s.id}>
                    <label htmlFor={s.first_name}>{s.first_name}</label>
                    <input
                      type='checkbox'
                      value={s.id}
                      checked={studentIds.includes(s.id)}
                      onChange={handleSelection}
                    />
                  </div>
                )
              })
            }
        </div>
        
        <div>
          <h4>Group Details</h4>
          <div>
            <label htmlFor='avoid'>Bad Pairing?</label>
            <input type='checkbox' name='avoid' checked={group.avoid} onChange={() => updateGroup({...group, avoid: !group.avoid})}/>
          </div>
          <div>
            <label htmlFor='notes'>Notes:</label>
            <textarea name='notes' value={group.notes} onChange={e => updateGroup({...group, notes: e.target.value})} />
          </div>
        </div>

        <div>
          <input type='submit' value="Add/Update" />
        </div>
      </form>
    </>
  )
}

export default Form