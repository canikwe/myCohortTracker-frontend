import React from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { updateFilters, updateModFilters } from '../redux/actions/index'

const Filters = () => {

  const dispatch = useDispatch()

  const { filters } = useSelector(state => ({
    filters: state.filters
  }), shallowEqual)

  const mainHandler = event => dispatch(updateFilters(event))

  return (
    <section className='filters'>

      <label htmlFor='mod'>Filter by Category</label>
      <select 
        name='category' 
        onChange={mainHandler} 
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
        onChange={event => dispatch(updateModFilters(event))} 
      >
        <option value='all'>Show All Mods</option>
        {[1, 2, 3, 4, 5].map(mod => <option key={mod} value={mod}>Mod - {mod}</option>)}
      </select>

      <input 
        type='text'
        name='term'
        value={filters.term} 
        onChange={mainHandler}
        placeholder='Search Activities'
      />
    </section>
  )
}

export default Filters