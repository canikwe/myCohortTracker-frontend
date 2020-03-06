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
import CreateCohortView from './pages/CreateCohortView'


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
        <Route exact path='/:batch_id/pairs'>
          <PairsView />
        </Route>
        <Route exact path='/cohorts/new'>
          <CreateCohortView />
        </Route>
      </Switch>
    </main>
  );
}

export default App;
