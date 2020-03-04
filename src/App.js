import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Header from './components/Header'
import Filters from './components/Filters'
import PairsContainer from './containers/PairsContainer'
import SideBar from './containers/SideBar'
import './scss/main.scss'

// redux
import { fetchingStudents, fetchingCohort } from './redux/actions/async'
import { fetchingGroups, creatingGroup, updatingGroup } from './redux/actions/group'
import { fetchingActivities } from './redux/actions/activities'

function App() {

  // const [activities, updateActivities] = useState([])
  const updateActivities = console.log

  //redux
  const dispatch = useDispatch()

  useEffect(() => {

    dispatch(fetchingCohort())
    dispatch(fetchingStudents())
    dispatch(fetchingGroups())
    dispatch(fetchingActivities())
    
  }, [dispatch])

  const handleSubmit = data => {
    data.group.id ? dispatch(updatingGroup(data)) : dispatch(creatingGroup(data))
  }

  return (
    <main className="App">
      <Header />
      <Filters />
      <PairsContainer />
      <SideBar 
        handleSubmit={handleSubmit}
        updateActivities={updateActivities}
      />
    </main>
  );
}

export default App;
