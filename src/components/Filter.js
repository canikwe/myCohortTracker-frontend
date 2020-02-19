import React from 'react'

const Filter = ({ handleChange, filter }) => {
  return (
    <section className='filter'>
      <label htmlFor='project'>Display Project</label>
      <input
        type='radio'
        checked={filter === 'project'}
        value='project'
        onChange={e => handleChange(e.target.value)}
      />

      <label htmlFor='labs'>Display Labs</label>
      <input 
        type='radio' 
        checked={filter === 'lab'} 
        value='lab' 
        onChange={e => handleChange(e.target.value)} 
      />

      <label htmlFor='all'>Display All</label>
      <input 
        type='radio'
        checked={filter === 'all'} 
        value='all' 
        onChange={e => handleChange(e.target.value)} 
      />
    </section>
  )
}

export default Filter