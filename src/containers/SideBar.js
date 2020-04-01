import React, { useEffect } from 'react'

import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { openGroupForm } from '../redux/actions'

import { CirclePicker } from 'react-color'

import GroupsList from './GroupsList'
import CreateGroupContainer from './CreateGroupContainer'

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
         
      {
        activeStudentX || activeStudentY ?
        <GroupsList />
        : null
      }

      {
        createGroupToggle || activeStudentX || activeStudentY ?
          null
          : <h3 className='header'>{'<< Choose a Pair'}</h3>
      }

      { createGroupToggle 
        ? <CreateGroupContainer /> 
        : 
        <button 
          className='secondary' 
          onClick={() => dispatch(openGroupForm())}
        >
          Create a New Pair
        </button> }

      <div className='color-selector'>
        <label htmlFor='color-selector'>Set Theme</label>
        <CirclePicker onChangeComplete={handleChangeComplete}/>
      </div>
    </aside>
  )
}

export default SideBar