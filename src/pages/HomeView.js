import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const HomeView = () => {
  const {cohorts} = useSelector(state => ({
    cohorts: state.cohorts
  }))
  return (
    <section>
      <h1>Cohorts</h1>
      <ul>
        { cohorts.map(c => (
          <li>
            <Link key={c.id} to={`/${c.batch_id}/pairs`}>
              {c.name} - {c.batch}
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