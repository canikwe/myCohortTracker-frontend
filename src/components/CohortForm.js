import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { creatingCohort, uploadingCsv, fetchingCohort, updatingCohort } from '../redux/actions/cohorts'

const CohortForm = ({ edit }) => {
  const newCohort = () => ({ batch: '', name: '', batch_id: '' })
  const newStudent = () => ({ first_name: '', last_name: '' })

  const [cohort, updateCohort] = useState(newCohort())
  const [students, updateStudents] = useState([newStudent(), newStudent(), newStudent()])

  const {selectedCohort, selectedStudents} = useSelector(state => ({
    selectedCohort: state.cohort,
    selectedStudents: state.students
  }))
  const { batch_id } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    if (edit && cohort.batch_id !== parseInt(batch_id)) {
      dispatch(fetchingCohort(batch_id))
    }
    if (selectedCohort.id) {
      updateCohort(selectedCohort)
      updateStudents(selectedStudents)
    }
  }, [selectedCohort, selectedStudents])

  const handleSubmit = e => {
    e.preventDefault()
    if (edit) {
      console.log('update cohort')
      dispatch(updatingCohort({...cohort, students}))
    } else if (e.target.csv.files.length) {
      dispatch(uploadingCsv({ ...cohort, csv: e.target.csv.files[0] }))
    } else {
      dispatch(creatingCohort({ ...cohort, students }))
    }
  }

  // helper functions
  const handleCohortChange = e => {
    updateCohort({ ...cohort, [e.target.name]: e.target.value })
  }

  const handleStudentChange = e => {
    const updatedStudents = students.map((s, i) => {
      return i === parseInt(e.target.id) ? { ...s, [e.target.name]: e.target.value } : s
    })
    updateStudents(updatedStudents)
  }

  return (
    <>
      <h1>Create Cohort</h1>
      <form onSubmit={handleSubmit}>
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
          <input type='number' name='batch_id' value={cohort.batch_id} onChange={handleCohortChange} />
        </div>

        <hr />

        {students.map((s, i) => {
          return (
            <div key={i}>
              <label htmlFor='first_name'>First Name</label>
              <input type='text' name='first_name' id={i} value={s.first_name} onChange={handleStudentChange} />
              <label htmlFor='last_name'>Last Name</label>
              <input type='text' name='last_name' id={i} value={s.last_name} onChange={handleStudentChange} />
            </div>
          )
        }
        )}

        <p />
        <p />
        <p />
        <p />
        { !edit ?
          <input type='file' name='csv' />
          : null
        }
        <input type='submit' value={edit ? 'Update Cohort' : 'Create Cohort'} />
      </form>
      <button onClick={() => updateStudents([...students, newStudent()])}>Add New Student</button>
    </>
  )
}

export default CohortForm