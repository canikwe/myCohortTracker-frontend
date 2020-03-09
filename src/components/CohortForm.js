import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { useParams } from 'react-router-dom'
import { creatingCohort, uploadingCsv, fetchingCohort, updatingCohort } from '../redux/actions/cohorts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserTimes } from '@fortawesome/free-solid-svg-icons'

const CohortForm = ({ title }) => {
  const newCohort = () => ({ batch: '', name: '', batch_id: '' })
  const newStudent = () => ({ first_name: '', last_name: '' })

  const [cohort, updateCohort] = useState(newCohort())
  const [students, updateStudents] = useState([newStudent(), newStudent(), newStudent()])
  const { batch_id } = useParams()

  const {selectedCohort, selectedStudents} = useSelector(state => ({
    selectedCohort: state.cohort,
    selectedStudents: state.students
  }), shallowEqual)
  const dispatch = useDispatch()
  
  useEffect(() => {
    if (title === 'Edit' && selectedCohort.id) {
      // debugger
      updateCohort(selectedCohort)
      updateStudents(selectedStudents)
    }
    if (title === 'Edit' && selectedCohort.batch_id !== parseInt(batch_id)) {
      // debugger
      dispatch(fetchingCohort(batch_id))
    }
  }, [selectedCohort, selectedStudents, title, batch_id, dispatch])

  const handleSubmit = e => {
    e.preventDefault()
    if (title === 'Edit') {
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

  const removeStudent = e => {
    const updatedStudents = students.filter((s, i) =>  i !== parseInt(e.target.id))
    updateStudents(updatedStudents)
  }

  return (
    <div className='cohort-form-container'>
      <h1>{title} Cohort</h1>
      <form onSubmit={handleSubmit} className='cohort'>
        <section>
          <div className='form-section'>
            <label htmlFor='batch'>Batch: </label>
            <input type='text' name='batch' value={cohort.batch} onChange={handleCohortChange} />
          </div>
          <div className='form-section'>
            <label htmlFor='name'>Name: </label>
            <input type='text' name='name' value={cohort.name} onChange={handleCohortChange} />
          </div>
          <div className='form-section'>
            <label htmlFor='batch_id'>Batch Id: </label>
            <input type='number' name='batch_id' value={cohort.batch_id} onChange={handleCohortChange} />
          </div>
        </section>

        <hr />
        {title === 'Create' ? <h3>Manual Student Entry</h3> : <h3>Edit Students</h3>}
        {students.map((s, i) => {
          return (
            <div className='students' key={i}>
              <div>
                <label htmlFor='first_name'>First Name: </label>
                <input type='text' name='first_name' id={`${i}-first`} value={s.first_name} onChange={handleStudentChange} />
              </div>

              <div>
                <label htmlFor='last_name'>Last Name: </label>
                <input type='text' name='last_name' id={`${i}-last`} value={s.last_name} onChange={handleStudentChange} />
                <FontAwesomeIcon icon={faUserTimes} id={`${i}-remove`} onClick={removeStudent} />
                {i === students.length - 1 ? <button onClick={() => updateStudents([...students, newStudent()])}>Add New Student</button> : null}
              </div>

            </div>
          )
        }
        )}

        
        { title === 'Create' ? (
          <>
          <p>---------- OR -----------</p>
          <h3>Upload CSV</h3>
            <input type='file' name='csv' />
          </>
        )
          : null
        }
        <div>
          <input type='submit' value={title + ' Cohort'} />
        </div>
      </form>
    </div>
  )
}

export default CohortForm