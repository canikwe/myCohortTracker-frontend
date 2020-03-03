import React from 'react'
import { useDispatch } from 'react-redux'
import { updateActiveStudentX, updateActiveStudentY } from '../redux/actions/index'

const ColumnHeader = ({ studentY }) => {
  const dispatch = useDispatch()

  return (
    <div 
      className='cell anchorY' 
      onClick={() => {
        dispatch(updateActiveStudentY(studentY))
        dispatch(updateActiveStudentX(null))
      }}
    >
      {studentY.first_name}
    </div>
  )
}

export default ColumnHeader