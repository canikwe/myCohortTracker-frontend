import React, { useState, useEffect } from 'react'
import { getStudentGroups, getMatchedGroups } from '../helper/functions'

const Form = ({ students, handleSubmit, activeStudentX, activeStudentY, groups, activities }) => {
  const [studentIds, updateStudentIds] = useState([])
  const [searchTerm, updateSearchTerm] = useState('')
  const [activity, updateActivity] = useState({})
  const [toggle, updateToggle] = useState(false)

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
    debugger
    const data = { activity, group: {student_ids: studentIds} }

    handleSubmit(data)
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

  const displayedActivities = () => {
    if (searchTerm === '') {
      return []
    } else {
      return activities.filter(a => a.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }
  }

  const toggleCreateForm = () => {
    updateToggle(!toggle)
    updateActivity({name: searchTerm})
  }

  const handleActivityChange = e => {
    // debugger
    updateActivity({...activity, [e.target.name]: e.target.value})
  }

  const handleSearchTerm = e => {
    updateSearchTerm(e.target.value)
    if (!activity.id) updateActivity({...activity, name: searchTerm})
  }

  return (
    <aside className='sidebar'>
      {
        activeStudentX || activeStudentY ?
        <section>
          <ul>
            {
              displayedGroups().map(g => <li key={g.id}>{g.activity.name}</li>)
            }
          </ul>
        </section>
        : null
      }


      <h3>Create Pairs</h3>
      <form onSubmit={submitForm}>
        {
          students.map(s => {
            return (
              <React.Fragment key={s.id}>
                <div>
                  <label htmlFor={s.first_name}>{s.first_name}</label>
                <input 
                  type='checkbox' 
                  value={s.id}
                  checked={studentIds.includes(s.id)}
                  onChange={handleSelection}
                  />
                </div>
              </React.Fragment>
            )
          })
        }
        <p />
        <label htmlFor='searchTerm'>Activity Name</label>
        <input type='text' value={searchTerm} onChange={handleSearchTerm} />
        <p />
        <ul>
          { displayedActivities().map(a => <li key={a.id} onClick={(e) => selectActivity(e, a)}>{a.name}</li>) }
        </ul>

          { searchTerm.length && !displayedActivities().length ? (
              <h3>
                No activity found... Create one? 
                <span onClick={toggleCreateForm}>➕</span>
              </h3>              
          ) : null }

          { toggle ? (
            <>
              <p>
                <label htmlFor='category'>Category: </label><input type='text' name='category' onChange={handleActivityChange} />
              </p>
              <p>
                <label htmlFor='mod'>Mod: </label><input type='number' name='mod' onChange={handleActivityChange} min='1' max='5' />
              </p>
            </>
          ) : null}

        <input type='submit' value="Add/Update" />
      </form>
    </aside>
  )
}

export default Form