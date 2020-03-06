import React, { useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { fetchingStudents, fetchingCohort } from './redux/actions/async'
import { fetchingGroups } from './redux/actions/group'
import { fetchingActivities } from './redux/actions/activities'

import Header from './components/Header'
import PairsView from './pages/PairsView'
import HomeView from './pages/HomeView'
import './scss/main.scss'
import { fetchingCohorts } from './redux/actions/cohorts'


function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    // dispatch(fetchingCohort())
    dispatch(fetchingStudents())
    dispatch(fetchingGroups())
    dispatch(fetchingActivities())
    dispatch(fetchingCohorts())
    
  }, [dispatch])

  return (
    <main className='App'>
      <Header />

      <Switch>
        <Route exact path='/home'>
          <HomeView />
        </Route>
        <Route exact path='/pairs'>
          <PairsView />
        </Route>
      </Switch>
    </main>
  );
}

export default App;
