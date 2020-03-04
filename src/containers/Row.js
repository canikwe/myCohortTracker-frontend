import React from 'react'
import Cell from '../components/Cell'
import { useDispatch } from 'react-redux'
import { updateActiveStudentX, updateActiveStudentY } from '../redux/actions/index'

const Row = ({ studentX, allStudents }) => {
  const dispatch = useDispatch()
  
  return (
    <section className='row'>
      <div 
        className='cell anchorX'
        onClick={() => {
          dispatch(updateActiveStudentX(studentX))
          dispatch(updateActiveStudentY(null))
        }}
      >
        {studentX.first_name}
      </div>
      {allStudents.map(studentY => {

        return (
          <Cell
            key={studentY.id}
            studentX={studentX}
            studentY={studentY}
          />
        )}
      )}
    </section>
  )
}

export default Row