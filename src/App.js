import React, { useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { fetchingActivities } from './redux/actions/activities'

import Header from './components/Header'
import PairsView from './pages/PairsView'
import DashboardView from './pages/DashboardView'
import './scss/main.scss'
import { fetchingCohorts } from './redux/actions/cohorts'
import CreateCohortView from './pages/CreateCohortView'
import EditCohortView from './pages/EditCohortView'
import HomeView from './pages/HomeView'


function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    // dispatch(fetchingActivities())
    // dispatch(fetchingCohorts())
    
  }, [dispatch])

  return (
    <main className='App'>
      <Header />

      <Switch>
        <Route exact path='/'>
          <HomeView />
        </Route>
        <Route exact path='/dashboard'>
          <DashboardView />
        </Route>
        <Route exact path='/:batch_id/pairs'>
          <PairsView />
        </Route>
        <Route exact path='/:batch_id/edit'>
          <EditCohortView />
        </Route>
        <Route exact path='/cohorts/new'>
          <CreateCohortView />
        </Route>

      </Switch>
    </main>
  );
}

export default App;
