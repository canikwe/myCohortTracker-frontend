import React, { useState, useEffect } from 'react'
import { getStudentGroups, getMatchedGroups } from '../helper/functions'

const Form = ({ students, handleSubmit, activeStudentX, activeStudentY, groups }) => {
  const [studentIds, updateStudentIds] = useState([])
  const [name, updateName] = useState('')

  useEffect(() => {
    if (activeStudentX && activeStudentY) {
      updateStudentIds([activeStudentX.id, activeStudentY.id])
    }
  }, [activeStudentX, activeStudentY])

  const submitForm = e => {
    e.preventDefault()
    const data = { name, student_ids: studentIds }

    handleSubmit(data)
    // updateStudentIds([])
  }

  const handleSelection = e => {
    const id = parseInt(e.target.value)
    console.log(studentIds.includes(id))
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

  console.log(displayedGroups())

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
        {/* <label htmlFor='Students'>Students</label> */}
        {/* <select multiple onChange={handleSelection}>
          {
            students.map(s => (
              <option key={s.id} value={s.id}>{s.first_name}</option>
            ))
          }
        </select> */}
        {
          students.map(s => {
            return (
              <>
                <div>
                  <label htmlFor={s.first_name}>{s.first_name}</label>
                <input 
                  type='checkbox' 
                  value={s.id}
                  checked={studentIds.includes(s.id)}
                  onChange={handleSelection}
                  />
                </div>
            </>
            )
          })
        }
        <p />
        <label htmlFor='Name'>Name</label>
        <input type='text' value={name} onChange={e => updateName(e.target.value)} />
        <p />
        <input type='submit' value="Add/Update" />
      </form>
    </aside>
  )
}

export default Form