import React from 'react'

const GroupForm = ({ students, handleSelection, group, updateGroup, submitForm, updateFormToggle, toggleCreateForm, updateActivity}) => {

  return (
    <>
      <button onClick={() => {
        updateFormToggle(false)
        toggleCreateForm(false)
        updateActivity({})
        updateGroup({ notes: '', avoid: false, student_ids: [] })
        }}>Go Back</button>
 
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
                    checked={group.student_ids.includes(s.id)}
                    onChange={handleSelection}
                  />
                </div>
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
    </>
  )
}

export default GroupForm