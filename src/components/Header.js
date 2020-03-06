import React from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Header = () => {

  const { cohorts } = useSelector(state => ({
    cohorts: state.cohorts,
  }), shallowEqual)

  return (
    <section className='main-header'>
      {/* <h1>{cohorts[0].batch} - {cohorts[0].name}</h1> */}
      <Link to='/pairs'>Pairs</Link> | 
      <Link to='/home'>Home</Link> |
      <Link to='/cohorts/new'>Create Cohort</Link>
    </section>
  )
}

export default Header