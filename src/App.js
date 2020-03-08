import React, { useEffect } from 'react'

import { Switch, Route, Redirect } from 'react-router-dom'

import Header from './components/Header'
import PairsView from './pages/PairsView'
import DashboardView from './pages/DashboardView'
import './scss/main.scss'
import CreateCohortView from './pages/CreateCohortView'
import EditCohortView from './pages/EditCohortView'
import HomeView from './pages/HomeView'
import { useSelector, useDispatch } from 'react-redux'
import { authorizingInstructor } from './redux/actions/async'


function App() {
  const { loggedIn } = useSelector(state => ({
    loggedIn: state.loggedIn
  }))
  const dispatch = useDispatch()

  useEffect(() => {
    // dispatch(authorizingInstructor())
    dispatch(authorizingInstructor())
  }, [])

  return (
    <main className='App'>
      <Header />

      <Switch>
        <Route exact path='/'>
          {
            loggedIn ? 
            <Redirect to='/dashboard' /> : 
            <HomeView />
          }
        </Route>
        <Route exact path='/dashboard'>
          {
            loggedIn ? 
            <DashboardView />
            :
            <Redirect to='/' />
          }
        </Route>
        <Route exact path='/:batch_id/pairs'>
          {
            loggedIn ?
            <PairsView />
            :
            <Redirect to='/' />
          }
        </Route>
        <Route exact path='/:batch_id/edit'>
          {
            loggedIn ?
            <EditCohortView />
            :
            <Redirect to='/' />
          }
        </Route>
        <Route exact path='/cohorts/new'>
          {
            loggedIn ?
            <CreateCohortView />
          :
            <Redirect to='/' />
          }
        </Route>

      </Switch>
    </main>
  );
}

export default App;
