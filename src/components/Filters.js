import React from 'react'

const Filters = ({ handleChange, filters }) => {
  console.log(filters)
  return (
    <section className='filter'>
      <label htmlFor='project'>Display Project</label>
      <input
        type='radio'
        checked={filters.category === 'project'}
        name='category'
        value='project'
        onChange={e => handleChange({...filters, category: e.target.value})}
      />

      <label htmlFor='labs'>Display Labs</label>
      <input 
        type='radio'
        checked={filters.category === 'lab'}
        name='category' 
        value='lab' 
        onChange={e => handleChange({ ...filters, category: e.target.value })}
      />

      <label htmlFor='mod'>Filter by Mod</label>
      <select 
        value='mod'
        name='mod'
        onChange={e => handleChange({...filters, mod: parseInt(e.target.value)})} 
      >
        {[1, 2, 3, 4, 5].map(mod => <option key={mod} value={mod}>Mod - {mod}</option>)}
      </select>

      <label htmlFor='all'>Display All</label>
      <input 
        type='radio'
        checked={filters.category === 'all'} 
        name='category'
        value='all' 
        onChange={e => handleChange({ ...filters, category: e.target.value })}
      />

      <label htmlFor='all'>Display All</label>
      <input 
        type='text'
        name='term'
        value={filters.term} 
        onChange={e => handleChange({ ...filters, term: e.target.value })}
      />
    </section>
  )
}

export default Filters