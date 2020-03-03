import React from 'react'

const Header = ({ cohort }) => {
  return (
    <section className='main-header'>
      <h1>{cohort.batch} - {cohort.name}</h1>
    </section>
  )
}

export default Header