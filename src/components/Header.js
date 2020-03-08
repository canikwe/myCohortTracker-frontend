import React from 'react'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { loginInstructor } from '../redux/actions/async'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

const Header = () => {

  const { loggedIn } = useSelector(state => ({
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
        <FontAwesomeIcon 
          icon={faSignOutAlt} 
          className='logout' 
          onClick={handleLogOut} 
          size="2x"
        />
        : null
      }
    </section>
  )
}

export default Header