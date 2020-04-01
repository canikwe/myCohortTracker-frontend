import React, { useState, useEffect } from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { creatingGroup, updatingGroup } from '../redux/actions/group'
import { closeGroupForm } from '../redux/actions'
import Swal from 'sweetalert2'

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

    if (validateForm()) {
      const data = { group: { ...group, activity_id: activity.id } }

      group.id ? dispatch(updatingGroup(data)) : dispatch(creatingGroup(data)) 
    }
  }

  const validateForm = () => {
    const date = new Date(group.activity_date)
    const errors = []
    
    if (!activity.id) {
      errors.push('Please choose or create a new activity')
    }
    if (!group.student_ids.length) {
      errors.push('Please select at least one student')
    }
    if (!date.getDate()) {
      errors.push('Please enter a valid date')
    }
    if (date.getFullYear() > new Date().getFullYear() + 1) {
      errors.push('Please enter a date less than a year in advance')
    } 
    if (date.getFullYear() < new Date().getFullYear() - 1){
      errors.push('You cannot retroactively add activities more than a year before today')
    }

    if (errors.length) {
      Swal.fire({
        title: 'Error creating activity',
        html: formatErrors(errors),
        icon: 'error'
      })
      return false
    }
    return true
  }

  const formatErrors = (errors) => {
    const formattedErrors = errors.map((e, i) => {
      return (
        `<div> ${i + 1}. ${e} </div>`
      )
    })
    
    return (
      formattedErrors.join('')
    )
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
        {/* <label htmlFor='activity_date'>Activity Date: </label> */}
        <h4 className='subheader'>Activity Date:</h4>
        <input 
          type='date' 
          name='activity_date' 
          onChange={e => updateGroup({ ...group, activity_date: e.target.value })}
          value={group.activity_date}
        />
      </div>

      <div className='group-form-section'>
        <h4 className='subheader'>Students:</h4>
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
      
      <div className='group-form-section'>
       
        <h4 className='subheader'>{group.id ? group.activity.name : ''} Group Details:</h4>

        <div className='group-form-sub-section'>
          <label htmlFor='avoid'>Bad Pairing? </label>
          <input type='checkbox' name='avoid' checked={group.avoid} onChange={() => updateGroup({...group, avoid: !group.avoid})}/>
        </div>

        <div className='group-form-sub-section'>
          <label htmlFor='notes'>Notes: </label>
          <textarea 
            placeholder='Anything significant to keep in mind for future pairings?'
            className='group-notes' 
            rows="5"
            name='notes' 
            value={group.notes} 
            onChange={e => updateGroup({...group, notes: e.target.value})} 
          />
        </div>
      </div>

      <div>
        <button className='cancel' onClick={() => dispatch(closeGroupForm())}>Cancel</button>
        <input className='add' type='submit' value={group.id ? "Update" : "Add"} />
      </div>
    </form>
  )
}

export default GroupForm