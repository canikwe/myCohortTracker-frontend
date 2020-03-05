import React from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { searchActivity, selectActivity, cancelActivitySearch } from '../redux/actions/activities'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons'

const SearchActivityForm = () => {

  const { searchTerm, results } = useSelector(state => ({
    searchTerm: state.activitySearchTerm,
    results: state.activitySearchTerm.length ? state.activities.filter(a => a.name.toLowerCase().includes(state.activitySearchTerm.toLowerCase())) : [] 
  }), shallowEqual)

  const dispatch = useDispatch()

  return (
    <>
      <h3>Search Activity</h3>
      <label htmlFor='searchTerm'>Search  </label>
      <input 
        type='text' 
        value={searchTerm} 
        placeholder='E.g. Mod 2 Final Project' 
        onChange={(e) => dispatch(searchActivity(e))}
      />

      {searchTerm.length && !results.length ? (
        <h4>No activity found...</h4>
      ) : (
        <ul>
          {
            results.map(a => (
              <li 
                key={a.id} 
                onClick={() => dispatch(selectActivity(a))}
              >
                {`${a.name} (${a.mod})`}
              </li>
            ))
          }
        </ul>
      )}
      <button className='cancel' onClick={() => dispatch(cancelActivitySearch())}>Cancel</button>
    </>
  )
}

export default SearchActivityForm