import React from 'react'

const Filters = ({ updateFilters, filters }) => {
  const handleFilters = e => {
    if (e.target.name === 'mod' && e.target.value !== 'all') {
      updateFilters({...filters, mod: parseInt(e.target.value)})
    } else {
      updateFilters({...filters, [e.target.name]: e.target.value})
    }
  }

  return (
    <section className='filters'>
      <label htmlFor='project'>Display Project</label>
      <input
        type='radio'
        checked={filters.category === 'project'}
        name='category'
        value='project'
        onChange={handleFilters}
      />

      <label htmlFor='labs'>Display Labs</label>
      <input 
        type='radio'
        checked={filters.category === 'lab'}
        name='category' 
        value='lab' 
        onChange={handleFilters}
      />

      <label htmlFor='mod'>Filter by Mod</label>
      <select 
        name='mod'
        value={filters.mod}
        onChange={handleFilters} 
      >
        <option value='all'>Show All Mods</option>
        {[1, 2, 3, 4, 5].map(mod => <option key={mod} value={mod}>Mod - {mod}</option>)}
      </select>

      <label htmlFor='all'>Display All</label>
      <input 
        type='radio'
        checked={filters.category === 'all'} 
        name='category'
        value='all' 
        onChange={handleFilters}
      />

      <label htmlFor='search'>Search</label>
      <input 
        type='text'
        name='term'
        value={filters.term} 
        onChange={handleFilters}
      />
    </section>
  )
}

export default Filters