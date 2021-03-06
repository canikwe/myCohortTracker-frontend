import React from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { searchActivity, selectActivity } from '../redux/actions/activities'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { showActivityCreate } from '../redux/actions/activities'

const SearchActivityForm = () => {

  const { searchTerm, results } = useSelector(state => ({
    searchTerm: state.activitySearchTerm,
    results: state.activitySearchTerm !== '' ? state.activities.filter(a => a.name.toLowerCase().includes(state.activitySearchTerm.toLowerCase())) : []
  }), shallowEqual)

  const dispatch = useDispatch()

  const highlightSearchTerm = word => {
    const start = word.toLowerCase().indexOf(searchTerm.toLowerCase())
    
    if (searchTerm === '' || start === -1) {
      return <span>{word}</span>
    } else if (start === 0) {
      
      return (
        <>
          <span className='highlight'>
            {word.substring(start, searchTerm.length)}
          </span>
          <span>
            {word.substring(searchTerm.length)}
          </span>
        </>
      )

    } else if (start + searchTerm.length === word.length) {
      return (
        <>
          <span>
            {word.substring(0, start)}
          </span>
          <span className='highlight'>
            {word.substring(start)}
          </span>
        </>
      )
    } else {
      // debugger
      return (
        <>
          <span>
            {word.substring(0, start)}
          </span>
          <span className='highlight'>
            {word.substring(start, start + searchTerm.length)}
          </span>
          <span>
            {word.substring(start + searchTerm.length)}
          </span>
        </>
      )
    }
  }

  return (
    <>
      <h4 className='subheader'>Search Activity</h4>
      <div className='autocomplete'>
        <input 
          type='search' 
          value={searchTerm} 
          placeholder='E.g. Mod 2 Final Project' 
          onChange={(e) => dispatch(searchActivity(e))}
        />
        <FontAwesomeIcon 
          color='yellowgreen'
          className='new-activity-icon'
          icon={faPlus} 
          size='lg'
          onClick={() => dispatch(showActivityCreate())}
        />

        {searchTerm.length && !results.length ? (
          <h4>No activity found...</h4>
        ) : (
          <div className='autocomplete-items'>
            {
              results.map(a => (
                <div 
                  key={a.id} 
                  onClick={() => dispatch(selectActivity(a))}
                >
                  {highlightSearchTerm(a.name)}
                  <span>
                    {` (${a.mod})`}
                  </span>
                    {/* {`${a.name} (${a.mod})`} */}
                </div>
              ))
            }
          </div>
        )}

      </div>

      <div className='hr-line'></div>
    </>
  )
}

export default SearchActivityForm