import React, { useState, useEffect } from 'react'
import Filters from './components/Filters'
import PairsContainer from './containers/PairsContainer'
import Form from './containers/SideBar'
import './App.css'

const BASE_URL = 'http://localhost:3000/'

function App() {
  const [students, updateStudents] = useState([])
  const [groups, updateGroups] = useState([])
  const [activeStudentX, updateActiveStudentX] = useState(null)
  const [activeStudentY, updateActiveStudentY] = useState(null)
  // const [filter, updateFilter] = useState('all')
  const [filterOptions, updateFilterOptions] = useState({category: 'all', term: '', mod: 'all'})
  const [activities, updateActivities] = useState([])

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

    fetch(BASE_URL + 'activities')
      .then(res => res.json())
      .then(activities => updateActivities(activities))
    
  }, [])

  const handleSubmit = data => {
    data.group.id ? updateGroup(data) : createGroup(data)
  }

  const createGroup = data => {
    fetch(BASE_URL + 'groups', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accepted': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(group => updateGroups([...groups, group]))
  }

  const updateGroup = data => {
    fetch(BASE_URL + 'groups/' + data.group.id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'Accepted': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(group => updateGroups(groups.map(g => g.id === group.id ? group : g)))
  }

  const deleteGroup = group => {
    fetch(BASE_URL + 'groups/' + group.id, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(group => updateGroups(groups.filter(g => g.id !== group.id)))
  }

  const updateActiveStudents = (activeStudentX, activeStudentY) => {
    updateActiveStudentX(activeStudentX)
    updateActiveStudentY(activeStudentY)
  }

  const filteredGroups = () => {
    return groups.filter(g => {
      if (filterOptions.category === 'all') {
        return g.activity.name.toLowerCase().includes(filterOptions.term.toLowerCase())
      } else {
        return g.activity.category.toLowerCase() === filterOptions.category && g.activity.name.toLowerCase().includes(filterOptions.term.toLowerCase())
      }
    }).filter(g => filterOptions.mod !== 'all' ? g.activity.mod === filterOptions.mod : true)
  }

  return (
    <main className="App">
      <Filters filters={filterOptions} updateFilters={updateFilterOptions}/>
      <PairsContainer 
        groups={filteredGroups()} 
        students={students} 
        activeStudentX={activeStudentX}
        activeStudentY={activeStudentY}
        updateActiveStudents={updateActiveStudents}
        />
      <Form 
        students={students} 
        handleSubmit={handleSubmit}
        activeStudentX={activeStudentX}
        activeStudentY={activeStudentY}
        groups={filteredGroups()}
        deleteGroup={deleteGroup}
        activities={activities}
      />
    </main>
  );
}

export default App;
