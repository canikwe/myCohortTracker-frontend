import React from 'react'
import { useDispatch, shallowEqual, useSelector } from 'react-redux'
import { updateActiveStudentX, updateActiveStudentY } from '../redux/actions/index'

const Cell = ({ classNames, studentX, studentY, matchedGroups }) => {
  
  const dispatch = useDispatch()
  const { activeStudentX, activeStudentY } = useSelector(state => ({
    activeStudentX: state.activeStudentX,
    activeStudentY: state.activeStudentY
  }), shallowEqual)

  const handleClick = () => {
    
    if (studentX === activeStudentX && studentY === activeStudentY) {
      dispatch(updateActiveStudentX(null))
      dispatch(updateActiveStudentY(null))
    } else {
      dispatch(updateActiveStudentX(studentX))
      dispatch(updateActiveStudentY(studentY))
    }
  }

  return (
    <div
      onClick={handleClick}
      className={`cell${classNames}`}
    >
      { matchedGroups.map(g => ( 
        <div key={g.id}>
          <span>
            {g.avoid ? '❗️' : null}
            {g.activity.name}
          </span>
        </div>
      )) }
    </div>
  )
}

export default Cell