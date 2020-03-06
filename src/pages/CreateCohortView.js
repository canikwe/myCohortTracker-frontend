import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { creatingCohort } from '../redux/actions/cohorts'

const CreateCohortView = () => {
  const newCohort = () => ({batch: '', name: '', batch_id: null})
  const newStudent = () => ({first_name: '', last_name: ''})

  const [cohort, updateCohort] = useState(newCohort())
  const [students, updateStudents] = useState([newStudent(), newStudent(), newStudent()])

  const dispatch = useDispatch()

  // helper functions
  const handleCohortChange = e => {
    updateCohort({...cohort, [e.target.name]: e.target.value})
  }

  const handleStudentChange = e => {
    const updatedStudents = students.map((s, i) => {
      return i === parseInt(e.target.id) ? {...s, [e.target.name]: e.target.value} : s
    })
    updateStudents(updatedStudents)
  }

  return (
    <>
      <h1>Create Cohort</h1>
      <form onSubmit={e => {
          e.preventDefault()
          dispatch(creatingCohort({...cohort, students, csv: e.target.csv.value}))
        }}>
        <div>
          <label htmlFor='batch'>Batch</label>
          <input type='text' name='batch' value={cohort.batch} onChange={handleCohortChange} />
        </div>
        <div>
          <label htmlFor='name'>Name</label>
          <input type='text' name='name' value={cohort.name} onChange={handleCohortChange} />
        </div>
        <div>
          <label htmlFor='batch_id'>Batch Id</label>
          <input type='number' name='batch_id' value={cohort.id} onChange={handleCohortChange} />
        </div>

      <hr />

        {students.map((s, i) => {
          return (
            <div key={i}>
              <label htmlFor='first_name'>First Name</label>
              <input type='text' name='first_name' id={i} value={s.first_name} onChange={handleStudentChange}/>
              <label htmlFor='last_name'>Last Name</label>
              <input type='text' name='last_name' id={i} value={s.last_name} onChange={handleStudentChange}/>
            </div>
          )}
        )}

        <p />
        <p />
        <p />
        <p />
        <input type='file' name='csv' />
        <input type='submit' value='Create Cohort' />
      </form>
      <button onClick={() => updateStudents([...students, newStudent()])}>Add New Student</button>
    </>
  )
}

export default CreateCohortView