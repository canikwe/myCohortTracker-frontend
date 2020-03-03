import React, { useState, useEffect } from 'react'
import { useDispatch, shallowEqual, useSelector } from 'react-redux'
import Header from './components/Header'
import Filters from './components/Filters'
import PairsContainer from './containers/PairsContainer'
import SideBar from './containers/SideBar'
import './scss/main.scss'

// redux
// import { connect } from 'react-redux'
import { fetchingStudents } from './redux/actions/async'

const BASE_URL = 'http://localhost:3000/'

function App() {
  const [cohort, updateCohort] = useState({})
  // const [students, updateStudents] = useState([])
  const [groups, updateGroups] = useState([])
  const [activeStudentX, updateActiveStudentX] = useState(null)
  const [activeStudentY, updateActiveStudentY] = useState(null)
  // const [filter, updateFilter] = useState('all')
  const [filterOptions, updateFilterOptions] = useState({category: 'all', term: '', mod: 'all'})
  const [activities, updateActivities] = useState([])

  //redux
  const dispatch = useDispatch()
  const { students } = useSelector(state => ({
    students: state.students,
  }), shallowEqual)


  useEffect(() => {
    fetch(BASE_URL + 'cohorts')
    .then(res => res.json())
    .then(cohort => {

      updateCohort(cohort)
    })

    dispatch(fetchingStudents())

    fetch(BASE_URL + 'groups')
    .then(res => res.json())
    .then(groups => updateGroups(groups))

    fetch(BASE_URL + 'activities')
    .then(res => res.json())
    .then(activities => updateActivities(activities))
    
  }, [dispatch])

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



  const updateActiveStudents = (studentX, studentY) => {
    updateActiveStudentX(studentX)
    updateActiveStudentY(studentY)
    if (studentX === activeStudentX && !studentY) {
      updateActiveStudentX(null)
    }
    if (studentY === activeStudentY && !studentX)  {
      updateActiveStudentY(null)
    }
    if (studentX === activeStudentX && studentY === activeStudentY) {
      updateActiveStudentX(null)
      updateActiveStudentY(null)
    }
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
      <Header cohort={cohort} />
      <Filters filters={filterOptions} updateFilters={updateFilterOptions}/>
      <PairsContainer 
        groups={filteredGroups()} 
        students={students} 
        activeStudentX={activeStudentX}
        activeStudentY={activeStudentY}
        updateActiveStudents={updateActiveStudents}
        />
      <SideBar 
        students={students} 
        handleSubmit={handleSubmit}
        activeStudentX={activeStudentX}
        activeStudentY={activeStudentY}
        groups={filteredGroups()}
        deleteGroup={deleteGroup}
        BASE_URL={BASE_URL}
        updateActivities={updateActivities}
        // createActivity={createActivity}
        activities={activities}
      />
    </main>
  );
}

export default App;
