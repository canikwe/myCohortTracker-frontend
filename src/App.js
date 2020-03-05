import React, { useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { fetchingStudents, fetchingCohort } from './redux/actions/async'
import { fetchingGroups } from './redux/actions/group'
import { fetchingActivities } from './redux/actions/activities'

import './scss/main.scss'
import { Switch, Route } from 'react-router-dom'
import PairsView from './pages/PairsView'


function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchingCohort())
    dispatch(fetchingStudents())
    dispatch(fetchingGroups())
    dispatch(fetchingActivities())
    
  }, [dispatch])

  return (

    <Switch>
      <Route exact path='/hello'>
        <PairsView />
      </Route>
    </Switch>
  );
}

export default App;
