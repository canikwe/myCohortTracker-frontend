import React, { useState, useEffect } from 'react';
import PairsContainer from './containers/PairsContainer'
import Form from './components/Form';
import './App.css';

const BASE_URL = 'http://localhost:3000/'

function App() {
  const [students, updateStudents] = useState([])
  const [groups, updateGroups] = useState([])
  const [activeStudentX, updateActiveStudentX] = useState(null)
  const [activeStudentY, updateActiveStudentY] = useState(null)

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

  return (
    <main className="App">
      <PairsContainer 
        groups={groups} 
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
        groups={groups}
      />
    </main>
  );
}

export default App;
