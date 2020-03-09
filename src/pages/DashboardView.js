import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

const HomeView = () => {
  const {cohorts} = useSelector(state => ({
    cohorts: state.cohorts
  }))
  return (
    <section className='cohort-index'>
      <h1>Cohorts</h1>
      <ul>
        { cohorts.map(c => (
          <li key= { c.id }>
            <Link to={`/${c.batch_id}/pairs`}>
              {c.name} - {c.batch}
            </Link> 
            
            <Link to={`/${c.batch_id}/edit`} className='edit-icon'>
              <FontAwesomeIcon icon={faEdit} />
            </Link>
          </li>
        ))}
      </ul>

      <div>
        <h2>Create Cohort</h2>
        <Link to='/cohorts/new'>Create Cohort</Link>
      </div>
      
    </section>

  )
}

export default HomeView