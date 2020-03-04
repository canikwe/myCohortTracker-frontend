import React, { useState, useEffect } from 'react'
import { useDispatch, shallowEqual, useSelector } from 'react-redux'
import Header from './components/Header'
import Filters from './components/Filters'
import PairsContainer from './containers/PairsContainer'
import SideBar from './containers/SideBar'
import './scss/main.scss'

// redux
import { fetchingStudents, fetchingCohort } from './redux/actions/async'
import { fetchingGroups, creatingGroup, updatingGroup } from './redux/actions/group'

const BASE_URL = 'http://localhost:3000/'

function App() {

  const [filterOptions, updateFilterOptions] = useState({category: 'all', term: '', mod: 'all'})
  const [activities, updateActivities] = useState([])

  //redux
  const dispatch = useDispatch()
  const { groups } = useSelector(state => ({
    groups: state.groups
  }), shallowEqual)

  useEffect(() => {

    dispatch(fetchingCohort())
    dispatch(fetchingStudents())
    dispatch(fetchingGroups())

    fetch(BASE_URL + 'activities')
    .then(res => res.json())
    .then(activities => updateActivities(activities))
    
  }, [dispatch])

  const handleSubmit = data => {
    data.group.id ? dispatch(updatingGroup(data)) : dispatch(creatingGroup(data))
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
      <Header />
      <Filters filters={filterOptions} updateFilters={updateFilterOptions}/>
      <PairsContainer 
        groups={filteredGroups()} 
      />
      <SideBar 
        handleSubmit={handleSubmit}
        groups={filteredGroups()}
        BASE_URL={BASE_URL}
        updateActivities={updateActivities}
        // createActivity={createActivity}
        activities={activities}
      />
    </main>
  );
}

export default App;
