import React from 'react'
import { useSelector } from 'react-redux'

const HomeView = () => {
  const {cohorts} = useSelector(state => ({
    cohorts: state.cohorts
  }))
  return (
    <section>
      <h1>Cohorts</h1>
      <ul>
        { cohorts.map(c => (
          <li key={c.id}>
            {c.name} - {c.batch}
          </li>
        ))}
      </ul>
      
    </section>

  )
}

export default HomeView