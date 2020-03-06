import React, { useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { fetchingStudents, fetchingCohort } from '../redux/actions/async'
import { fetchingGroups } from '../redux/actions/group'
import { fetchingActivities } from '../redux/actions/activities'

import Header from '../components/Header'
import Filters from '../components/Filters'
import PairsContainer from '../containers/PairsContainer'
import SideBar from '../containers/SideBar'

const PairsView = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchingCohort())
    dispatch(fetchingStudents())
    dispatch(fetchingGroups())
    dispatch(fetchingActivities())

  }, [dispatch])

  return (
    <main className="pairs-view">
      {/* <Header /> */}
      <Filters />
      <PairsContainer />
      <SideBar />
    </main>
  )
}

export default PairsView