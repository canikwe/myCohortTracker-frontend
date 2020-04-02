import React, { useEffect } from 'react'

import { Switch, Route, Redirect } from 'react-router-dom'

import Header from './components/Header'
import PairsView from './pages/PairsView'
import DashboardView from './pages/DashboardView'
import './scss/main.scss'
import CreateCohortView from './pages/CreateCohortView'
import EditCohortView from './pages/EditCohortView'
import HomeView from './pages/HomeView'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { authorizingUser } from './redux/actions/async'
import Footer from './components/Footer'
import Loading from './components/Loading'
// import 'animate.css/animate.css'
import 'animate.css'


function App() {
  const { loggedIn, loading } = useSelector(state => ({
    loggedIn: state.loggedIn,
    loading: state.loading
  }), shallowEqual)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authorizingUser())
  }, [dispatch])

  if (loading) {
    return <Loading />
  }
  return (
    <>
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
          <Route exact path='/cohorts/:batch_id/pairs'>
            {
              loggedIn ?
              <PairsView />
              :
              <Redirect to='/' />
            }
          </Route>
          <Route exact path='/cohorts/:batch_id/edit'>
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

          <Route path='*'>
            <h1>Idk my bff, Jill.</h1>
          </Route>

        </Switch>
      </main>
      <Footer />
    </>
  );
}

export default App;
