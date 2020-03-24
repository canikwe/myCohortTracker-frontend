import React, { useState, useEffect } from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { creatingGroup, updatingGroup } from '../redux/actions/group'
import { closeGroupForm } from '../redux/actions'

const GroupForm = () => {
  
  const { students, activity, selectedGroup, activeStudentX, activeStudentY } = useSelector(state => ({
    students: state.students,
    activity: state.selectedActivity,
    selectedGroup: state.selectedGroup,
    activeStudentX: state.activeStudentX,
    activeStudentY: state.activeStudentY
  }), shallowEqual)

  const [group, updateGroup] = useState(selectedGroup)

  useEffect(() => {
    updateGroup(selectedGroup)
  }, [selectedGroup])

  useEffect(() => {
    if (activeStudentX && activeStudentX === activeStudentY) {
      updateGroup(g => ({ ...g, activity_date: g.activity_date, student_ids: [activeStudentX.id] }))
    } else if (activeStudentX && activeStudentY) {
      updateGroup(g => ({ ...g, activity_date: g.activity_date, student_ids: [activeStudentX.id, activeStudentY.id] }))
    } else if (activeStudentX) {
      updateGroup(g => ({ ...g, activity_date: g.activity_date, student_ids: [activeStudentX.id] }))
    } else if (activeStudentY) {
      updateGroup(g => ({ ...g, activity_date: g.activity_date, student_ids: [activeStudentY.id] }))
    } else {
      updateGroup(g => ({ ...g, activity_date: g.activity_date, student_ids: [] }))
    }
  }, [activeStudentX, activeStudentY, selectedGroup])

  const dispatch = useDispatch()

  const submitForm = e => {
    e.preventDefault()
    if (activity.id) {
      const data = { group: { ...group, activity_id: activity.id } }

      group.id ? dispatch(updatingGroup(data)) : dispatch(creatingGroup(data)) 
    } else {
      alert('Please choose or create a new activity')
    }
  }

  const handleStudentSelect = event => {
    let student_ids = []
    const studentId = parseInt(event.target.id)

    if (!event.target.id) {
      student_ids = []
    } else if (group.student_ids.includes(studentId)) {
      student_ids = group.student_ids.filter(i => i !== studentId)
    } else {
      student_ids = [...group.student_ids, studentId]
    }
    updateGroup({ ...group, student_ids })
  }

  return (
    <form onSubmit={submitForm}>
      <div>
        <label htmlFor='activity_date'>Date: </label>
        <input 
          type='date' 
          name='activity_date' 
          onChange={e => updateGroup({ ...group, activity_date: e.target.value })}
          value={group.activity_date}
        />
      </div>

      <div>
        <p>Students: </p>
        {
          students.map(s => {
            return (
              <input
                key={s.id}
                type='button'
                value={s.first_name}
                id={s.id}
                className={`stdnt ${group.student_ids.includes(s.id) ? 'selected' : ''}`}
                onClick={handleStudentSelect}
              />
            )
          })
        }

        <span onClick={handleStudentSelect} className='stdnt-clear'>&times;</span>

      </div>
      
      <div>
        {
          group.id ? 
          <h4>{group.activity.name} Group Details</h4> :
          <h4>Group Details</h4>
        }

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
        <input type='button' className='cancel' value='Cancel' onClick={() => dispatch(closeGroupForm())} />
        <input type='submit' value={group.id ? "Update" : "Add"} />
      </div>
    </form>
  )
}

export default GroupForm