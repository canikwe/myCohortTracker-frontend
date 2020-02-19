import React, { useState, useEffect } from 'react'
import { getStudentGroups, getMatchedGroups } from '../helper/functions'

const Form = ({ students, handleSubmit, activeStudentX, activeStudentY, groups, activities }) => {
  const [studentIds, updateStudentIds] = useState([])
  const [name, updateName] = useState('')

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
    const data = { name, student_ids: studentIds }

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
    if (name === '') {
      return []
    } else {
      const filterdActivities = activities.filter(a => a.name.toLowerCase().includes(name.toLowerCase()))
      if (filterdActivities.length) {
        return filterdActivities
      } else {
        return [{id: 1, name: 'Sorry, not suggestions'}]
      }
    }
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
        <label htmlFor='Name'>Name</label>
        <input type='text' value={name} onChange={e => updateName(e.target.value)} />
        <p />
        <input type='submit' value="Add/Update" />
        <ul>
          { displayedActivities().map(a => <li key={a.id} onClick={e => updateName(a.name)}>{a.name}</li>) }
        </ul>
      </form>
    </aside>
  )
}

export default Form