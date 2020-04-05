import React, { useEffect } from 'react'

import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { updateActiveStudentX, updateActiveStudentY } from '../redux/actions/index'

import ColumnHeader from '../components/ColumnHeader'
import Row from './Row'
import { handleRedirect } from '../redux/actions/cohorts'

const PairsContainer = () => {
  const dispatch = useDispatch()

  const { students, redirect } = useSelector(state => ({
    students: state.students,
    redirect: state.redirect
  }), shallowEqual)

  useEffect(() => {
    if (redirect) {
      dispatch(handleRedirect(false))
    }
  }, [dispatch, redirect])

  return (
    <section className='pairs-container' dir='ltr'>
      
      <section className='row header'>
        <div 
          className='cell anchorY anchorX' 
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
          />
        )}
      )}
    </section>
  )
}

export default PairsContainer