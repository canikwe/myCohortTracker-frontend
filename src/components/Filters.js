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

      <label htmlFor='mod'>Filter by Category</label>
      <select 
        name='category' 
        onChange={handleFilters} 
        value={filters.category}
      >
        <option value='all'>Show All Categories</option>
        <option value='lab'>Labs</option>
        <option value='project'>Project</option>
      </select>

      <label htmlFor='mod'>Filter by Mod</label>
      <select 
        name='mod'
        value={filters.mod}
        onChange={handleFilters} 
      >
        <option value='all'>Show All Mods</option>
        {[1, 2, 3, 4, 5].map(mod => <option key={mod} value={mod}>Mod - {mod}</option>)}
      </select>

      {/* <label htmlFor='search'>Search: </label> */}
      <input 
        type='text'
        name='term'
        value={filters.term} 
        onChange={handleFilters}
        placeholder='Search Activities'
      />
    </section>
  )
}

export default Filters