import React from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Header = () => {

  const { cohorts, cohort } = useSelector(state => ({
    cohorts: state.cohorts,
    cohort: state.cohort
  }), shallowEqual)

  return (
    <section className='main-header'>
      {/* <h1>{cohorts[0].batch} - {cohorts[0].name}</h1> */}
      <Link to='/dashboard'>{'//'}</Link>
    </section>
  )
}

export default Header