import React from 'react'
import { useSelector, shallowEqual } from 'react-redux'

const GroupForm = ({ handleSelection, group, updateGroup, submitForm }) => {
  
  const { students } = useSelector(state => ({
    students: state.students
  }), shallowEqual)

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
                onClick={handleSelection}
              />
            )
          })
        }
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
        {/* <input type='button' className='cancel' value='Cancel' onClick={() => updateGroup({notes: '', avoid: false, student_ids: group.student_ids, activity_date: group.activity_date})} /> */}
        <input type='submit' value={group.id ? "Update" : "Add"} />
      </div>
    </form>
  )
}

export default GroupForm