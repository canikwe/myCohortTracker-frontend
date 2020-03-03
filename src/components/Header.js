import React from 'react'
import { shallowEqual, useSelector } from 'react-redux'

const Header = () => {

  const { cohort } = useSelector(state => ({
    cohort: state.cohort,
  }), shallowEqual)

  return (
    <section className='main-header'>
      <h1>{cohort.batch} - {cohort.name}</h1>
    </section>
  )
}

export default Header