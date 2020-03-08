import React from 'react'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { loginInstructor } from '../redux/actions/async'

const Header = () => {

  const { cohorts, cohort, loggedIn } = useSelector(state => ({
    cohorts: state.cohorts,
    cohort: state.cohort,
    loggedIn: state.loggedIn
  }), shallowEqual)

  const dispatch = useDispatch()
  const handleLogOut = () => {
    localStorage.removeItem('token')
    dispatch(loginInstructor(false))
  }

  return (
    <section className='main-header'>
      {/* <h1>{cohorts[0].batch} - {cohorts[0].name}</h1> */}
      <Link to='/dashboard'>{'//'}</Link>
      {loggedIn ?
        <button onClick={handleLogOut}>Log Out</button>
        : null
      }
    </section>
  )
}

export default Header