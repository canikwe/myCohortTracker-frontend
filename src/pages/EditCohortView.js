import React from 'react'
import CohortForm from '../components/CohortForm'
import Divider from '@material-ui/core/Divider'
import StudentIndexTable from '../components/StudentIndexTable'

const EditCohortView = () => {
  return (
    <section className='cohort-details-container'>
      <CohortForm title={'Edit'} />
      <Divider />
      <section id='student-form'>
        {/* <h3>Edit Students</h3> */}
        <StudentIndexTable />
      </section>
    </section>
  )
}

export default EditCohortView