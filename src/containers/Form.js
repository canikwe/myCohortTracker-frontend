import React from 'react'

const Form = ({ students, handleSelection, searchTerm, handleSearchTerm, displayedActivities, selectActivity, handleActivityChange, group, updateGroup, submitForm, updateFormToggle, createFormToggle, toggleCreateForm }) => {

  return (
    <>
      <button onClick={() => updateFormToggle(false)}>Go Back</button>
      <h3>Select Activity</h3>
      <div>
        Search Activities <span onClick={() => toggleCreateForm(false)} role='img' aria-label='search'>🔍</span>
      </div>
        {!createFormToggle ?
          <>
            <label htmlFor='searchTerm'>Search  </label>
            <input type='text' value={searchTerm} placeholder='E.g. Mod 2 Final Project' onChange={handleSearchTerm} />
            <ul>
              {
                displayedActivities.map(a => <li key={a.id} onClick={(e) => selectActivity(e, a)}>{a.name}</li>)
              }
            </ul>

            {searchTerm.length && !displayedActivities.length ? (
              <h4>No activity found...</h4>
            ) : null}
          </>
          : null
        }
      <div>
        Create New <span onClick={toggleCreateForm} role='img' aria-label='plus'>➕</span>
      </div>


      {createFormToggle ? (
        <form>
          <div>
            <label htmlFor='category'>Category: </label><input type='text' name='category' onChange={handleActivityChange} />
          </div>
          <div>
            <label htmlFor='mod'>Mod: </label><input type='number' name='mod' onChange={handleActivityChange} min='1' max='5' />
          </div>
        </form>
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
                      // checked={studentIds.includes(s.id)}
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

export default Form