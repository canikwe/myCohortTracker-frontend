import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchingCohort } from '../redux/actions/cohorts'

import Header from '../components/Header'
import Filters from '../components/Filters'
import PairsContainer from '../containers/PairsContainer'
import SideBar from '../containers/SideBar'

const PairsView = () => {
  const dispatch = useDispatch()
  const { batch_id } = useParams()
  const { cohort } = useSelector(({cohort}) => ({ cohort }))

  useEffect(() => {
    if (cohort.batch_id !== batch_id) {
      dispatch(fetchingCohort(batch_id))
    }
  }, [dispatch, batch_id])

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