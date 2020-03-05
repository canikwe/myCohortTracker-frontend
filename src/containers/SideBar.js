import React, { useEffect } from 'react'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { CirclePicker } from 'react-color'
import GroupsList from './GroupsList'
import CreateGroupContainer from './CreateGroupContainer'
import { openGroupForm, closeGroupForm } from '../redux/actions'

const SideBar = () => {

  const { activeStudentX, activeStudentY, createGroupToggle } = useSelector(state => ({
    activeStudentX: state.activeStudentX,
    activeStudentY: state.activeStudentY,
    createGroupToggle: state.createGroupToggle
  }), shallowEqual)

  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.hue) {
      const root = document.querySelector(':root')
      root.style.setProperty('--hue', localStorage.hue)
    }
  }, [])

  const handleChangeComplete = (color) => {
    const root = document.querySelector(':root')
    root.style.setProperty('--hue', color.hsl.h)
    localStorage.setItem('hue', color.hsl.h)
  }

  return (
    <aside className='sidebar'>
      {createGroupToggle ? <div className='header'>
        <span>
          <FontAwesomeIcon 
            icon={faArrowLeft}
            onClick={() => dispatch(closeGroupForm())}
          /> 
          Go back
        </span> 
      </div> : null }
         
      {
        activeStudentX || activeStudentY ?
        <GroupsList />
        : <h3 className='header'>Choose a Group</h3>
      }

      { createGroupToggle 
        ? <CreateGroupContainer /> 
        : 
        <button 
          className='secondary' 
          onClick={() => dispatch(openGroupForm())}
        >
          New Pair
        </button> }

      <div className='color-selector'>
        <label htmlFor='color-selector'>Set Theme</label>
        <CirclePicker onChangeComplete={handleChangeComplete}/>
      </div>
    </aside>
  )
}

export default SideBar