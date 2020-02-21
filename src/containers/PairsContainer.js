import React from 'react'
// import allStudents from "../helper/data.json"
import ColumnHeader from '../components/ColumnHeader'
import Row from './Row'
import { getStudentGroups } from '../helper/functions'

const PairsContainer = ({ groups, students, activeStudentX, activeStudentY, updateActiveStudents }) => {

  return (
    <section className='pairs-container'>
      
      <section className='row'>
        <div 
          className='cell anchorY' 
          onClick={() => updateActiveStudents(null, null)}
        >
          {'//'}
        </div>
        {
          students.map(studentY => <ColumnHeader key={studentY.id} studentY={studentY} handleClick={updateActiveStudents}/>)
        }
      </section>
      { students.map(studentX => {

        return (
          <Row 
            key={studentX.id} 
            studentX={studentX} 
            allStudents={students} 
            studentGroups={getStudentGroups(groups, studentX)}
            activeStudentX={activeStudentX} 
            activeStudentY={activeStudentY}
            handleClick={updateActiveStudents}
          />
        )}
      )}
    </section>
  )
}

export default PairsContainer