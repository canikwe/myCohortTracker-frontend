import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons'

const HomeView = () => {
  const {cohorts} = useSelector(state => ({
    cohorts: state.cohorts
  }))
  return (
    <section className='dashboard'>

      <section className='cohorts-index'>
        <section className='cohorts-list'>
          <h1>Cohorts</h1>

          <div className='cohorts-row cohorts-header'>
            <p>Batch</p>
            <p>Name</p>
            <p>Batch Id</p>
            <p>Campus</p>
            <p> . . .</p>
          </div>
          { cohorts.map(c => (
            <>
              <div className='hr-line'></div>
              <div className='cohorts-row' key= { c.id }>
                <Link to={`/cohorts/${c.batch_id}/pairs`}>
                  <p>{c.batch}</p>
                </Link>

                <Link to={`/cohorts/${c.batch_id}/pairs`}>
                  <p>
                    {c.name}
                  </p>
                </Link>

                <Link to={`/cohorts/${c.batch_id}/pairs`}>
                  <p>{c.batch_id}</p>
                </Link>

                <Link to={`/cohorts/${c.batch_id}/pairs`}>
                  <p>
                    DC
                  </p>
                </Link>
                
                <Link to={`/cohorts/${c.batch_id}/edit`} className='edit-icon'>
                  <FontAwesomeIcon icon={faEdit} />
                </Link>
              </div>
            </>
          ))}
        {/* <div className='vr-line'></div> */}
        </section>
      </section>

      <section className='create-cohort'>
        <Link to='/cohorts/new'>
          <FontAwesomeIcon icon={faPlus} color='yellowgreen' size='3x' />
        </Link>
        {/* <p>Create Cohort</p> */}
      </section>

    </section>

  )
}

export default HomeView