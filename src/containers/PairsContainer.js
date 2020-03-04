import React from 'react'
// import allStudents from "../helper/data.json"
import ColumnHeader from '../components/ColumnHeader'
import Row from './Row'
import { getStudentGroups } from '../helper/functions'

import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { updateActiveStudentX, updateActiveStudentY } from '../redux/actions/index'

const PairsContainer = ({ groups }) => {
  const dispatch = useDispatch()

  const { students } = useSelector(state => ({
    students: state.students
  }), shallowEqual)

  return (
    <section className='pairs-container'>
      
      <section className='row header'>
        <div 
          className='cell anchorY' 
          onClick={() => {
            dispatch(updateActiveStudentX(null))
            dispatch(updateActiveStudentY(null))
          }}
        >
          {'//'}
        </div>
        {
          students.map(studentY => <ColumnHeader key={studentY.id} studentY={studentY} />)
        }
      </section>
      { students.map(studentX => {

        return (
          <Row 
            key={studentX.id} 
            studentX={studentX} 
            allStudents={students} 
            studentGroups={getStudentGroups(groups, studentX)}
          />
        )}
      )}
    </section>
  )
}

export default PairsContainer