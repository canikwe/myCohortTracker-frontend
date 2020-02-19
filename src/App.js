import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PairsContainer from './containers/PairsContainer'
import Form from './components/Form'
import './App.css'

const BASE_URL = 'http://localhost:3000/'

function App() {
  const [students, updateStudents] = useState([])
  const [groups, updateGroups] = useState([])
  const [activeStudentX, updateActiveStudentX] = useState(null)
  const [activeStudentY, updateActiveStudentY] = useState(null)
  const [filter, updateFilter] = useState('all')

  useEffect(() => {
    fetch(BASE_URL + 'students')
      .then(res => res.json())
      .then(students => {
        students.sort((a, b) => a.first_name > b.first_name ? 1 : -1)

        updateStudents(students)
      })

    fetch(BASE_URL + 'groups')
      .then(res => res.json())
      .then(groups => updateGroups(groups))
    
  }, [])

  const updateActiveStudents = (activeStudentX, activeStudentY) => {
    updateActiveStudentX(activeStudentX)
    updateActiveStudentY(activeStudentY)
  }

  const createGroup = data => {

    fetch(BASE_URL + 'groups', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accepted': 'application/json' },
      body: JSON.stringify({ group: data })
    })
    .then(res => res.json())
    .then(group => updateGroups([...groups, group])
    )
  }

  const filteredGroups = () => {
    return groups.filter(g => {
      if (filter === 'all') {
        return true
      } else {
        return g.activity.category.toLowerCase() === filter
      }
    })
  }

  return (
    <main className="App">
      <Filter handleChange={updateFilter} filter={filter} />
      <PairsContainer 
        groups={filteredGroups()} 
        students={students} 
        activeStudentX={activeStudentX}
        activeStudentY={activeStudentY}
        updateActiveStudents={updateActiveStudents}
      />
      <Form 
        students={students} 
        handleSubmit={createGroup}
        activeStudentX={activeStudentX}
        activeStudentY={activeStudentY}
        groups={filteredGroups()}
      />
    </main>
  );
}

export default App;
