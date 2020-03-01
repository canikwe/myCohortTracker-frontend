import React from 'react'

const GroupForm = ({ students, handleSelection, group, updateGroup, submitForm }) => {

  return (
    <form onSubmit={submitForm}>
      <div>
        <h4>Students</h4>
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
        <input type='submit' value={group.id ? "Update" : "Add"} />
      </div>
    </form>
  )
}

export default GroupForm