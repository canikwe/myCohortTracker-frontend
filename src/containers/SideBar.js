import React, { useState } from 'react'
import Groups from '../components/Groups'
import Form from '../components/Form'
import { getStudentGroups, getMatchedGroups } from '../helper/functions'

const SideBar = ({ students, handleSubmit, activeStudentX, activeStudentY, groups, activities }) => {
  const [formToggle, updateFormToggle] = useState(false)

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

  return (
    <aside className='sidebar'>
      <h3>Pairings</h3>
      {
        activeStudentX || activeStudentY ?
        <Groups 
          groups={displayedGroups()}
        />
        : null
      }
      {
        formToggle ? 
        <Form 
          students={students} 
          activities={activities} 
          handleSubmit={handleSubmit} 
          activeStudentX={activeStudentX} 
          activeStudentY={activeStudentY}
          updateFormToggle={updateFormToggle}
        />
        :
        <button onClick={() => updateFormToggle(true)}>New Pair</button>
      }

    </aside>
  )
}

export default SideBar