import { FETCH_COHORTS, BASE_URL, CREATE_COHORT, FETCH_COHORT, UPDATE_COHORT, HEADERS } from "./constants";
import { updateLoading } from ".";
import Swal from 'sweetalert2'

const fetchCohorts = cohorts => ({ type: FETCH_COHORTS, payload: cohorts })

export const fetchingCohorts = () => {
  return dispatch => {
    dispatch(updateLoading(true))

    fetch(BASE_URL + 'cohorts', {
      headers: { ...HEADERS, Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error(res.statusText)
      }
    })
    .then(cohorts => {
      dispatch(updateLoading(false))
      dispatch(fetchCohorts(cohorts))
    })
    .catch(alert => Swal.fire({ icon: 'error', text: alert }))
  }
}

const fetchCohort = cohortData => ({ type: FETCH_COHORT, payload: cohortData })

export const fetchingCohort = batch_id => {
  return dispatch => {
    fetch(BASE_URL + 'cohorts/' + batch_id, {
      headers: { ...HEADERS, Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error(res.statusText)
      }
    })
    .then(cohortData => {
      dispatch(fetchCohort(cohortData))
    })
    .catch(alert => Swal.fire({ icon: 'error', text: alert }))
  }
}

const createCohort = cohort => ({type: CREATE_COHORT, payload: cohort})

export const creatingCohort = data => {

  return dispatch => {
    fetch(BASE_URL + 'cohorts', {
      method: 'POST',
      headers: { ...HEADERS, Authorization: `Bearer ${localStorage.getItem('token')}` },
      body: JSON.stringify({cohort: data})
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error(res.statusText)
      }
    })
    .then(cohort => dispatch(createCohort(cohort)))
    .catch(alert => Swal.fire({ icon: 'error', text: alert }))
  }
}

export const uploadingCsv = data => {
  let formData = new FormData()
  formData.append('csv', data.csv)
  delete data.csv
  formData.append('cohort', JSON.stringify(data))

  return dispatch => {
    fetch(BASE_URL + 'cohorts/csv_upload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      body: formData
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error(res.statusText)
      }
    })
    .then(cohort => dispatch(createCohort(cohort)))
    .catch(alert => Swal.fire({ icon: 'error', text: alert }))
  }
}

const updateCohort = data => ({type: UPDATE_COHORT, payload: data})

export const updatingCohort = data => {
  return dispatch => {
    fetch(BASE_URL + 'cohorts/' + data.id, {
      method: 'PATCH',
      headers: { ...HEADERS, Authorization: `Bearer ${localStorage.getItem('token')}` },
      body: JSON.stringify({ cohort: data })
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error(res.statusText)
      }
    })
    .then(data => dispatch(updateCohort(data)))
    .catch(alert => Swal.fire({ icon: 'error', text: alert }))
  }
}