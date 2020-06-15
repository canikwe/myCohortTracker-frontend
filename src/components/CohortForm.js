import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { useParams, Redirect } from 'react-router-dom'
import { creatingCohort, uploadingCsv, fetchingCohort, updatingCohort } from '../redux/actions/cohorts'
import { formatErrors } from '../helper/functions'
import Swal from 'sweetalert2'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}))


const CohortForm = ({ title }) => {
  const newCohort = () => ({ batch: '', name: '', batch_id: '' })

  const [cohort, updateCohort] = useState(newCohort())
  const { batch_id } = useParams()

  const {selectedCohort, redirect} = useSelector(state => ({
    selectedCohort: state.cohort,
    redirect: state.redirect
  }), shallowEqual)
  const dispatch = useDispatch()
  const classes = useStyles()
  
  useEffect(() => {
    if (title === 'Edit' && selectedCohort.id) {
      updateCohort(selectedCohort)
    }
    if (title === 'Edit' && selectedCohort.batch_id !== parseInt(batch_id)) {
      dispatch(fetchingCohort(batch_id))
    }
  }, [selectedCohort, title, batch_id, dispatch])

  const handleSubmit = e => {
    e.preventDefault()

    if (validateForm()) {
      if (title === 'Edit') {
        dispatch(updatingCohort(cohort))
      } else if (e.target.csv.files.length) {
        dispatch(uploadingCsv({ ...cohort, csv: e.target.csv.files[0] }))
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error creating cohort',
          html: formatErrors(["Please upload this cohort's roster by CSV"])
        })
      }
    }
  }

  const validateForm = () => {
    const errors = []

    if (cohort.batch === '') {
      errors.push('Please specify the batch')
    }
    if (cohort.batch_id === '') {
      errors.push('Please enter a UNIQUE batch id')
    }

    if (errors.length) {
      Swal.fire({
        icon: 'error',
        title: 'Error creating cohort',
        html: formatErrors(errors)
      })
      return false
    }
    return true
  }

  // helper functions
  const handleCohortChange = e => {
    updateCohort({ ...cohort, [e.target.name]: e.target.value })
  }

  if (redirect) {
    return <Redirect to={`/cohorts/${selectedCohort.batch_id}/pairs`} />
  }

  return (
    <div className='cohort-form-container'>
      <h1>{title} Cohort</h1>
      <form onSubmit={handleSubmit} className={classes.root}>
        <section>
          <TextField
            required
            label="Batch"
            name='batch'
            value={cohort.batch}
            onChange={handleCohortChange}
            helperText="e.g. dc-web-010719"
          />
          <TextField
            required
            label="Cohort Name"
            name='name'
            value={cohort.name}
            onChange={handleCohortChange}
            helperText="e.g. JSON Derulo Fanclub"
          />
          <TextField
            required
            label="Batch Id"
            name='batch_id'
            value={cohort.batch_id}
            onChange={handleCohortChange}
            type="number"
          />
        </section>

        {title === 'Create' && (
          <section>
            <input 
              type='file' 
              name='csv' 
              style={{ display: 'none' }}
              id="raised-button-file"
            />
            <label htmlFor="raised-button-file">
              <Button
                variant="raised" 
                component="span"
                color="default"
                startIcon={<CloudUploadIcon />}
              >
                Upload Cohort CSV
              </Button>
            </label> 
          </section>
        )}

        <section className='submit-btn'>
          <Button variant="contained" type='submit'>{title + ' Cohort'}</Button>
        </section>
      </form>
    </div>
  )
}

export default CohortForm