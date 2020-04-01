import { FETCH_COHORTS, BASE_URL, CREATE_COHORT, FETCH_COHORT, UPDATE_COHORT, HEADERS, HANDLE_REDIRECT } from "./constants";
import { updateLoading } from ".";
import Swal from 'sweetalert2'
import { formatErrors } from "../../helper/functions";

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
      if (res.ok || res.status === 406) {
        return res.json()
      } else {
        throw new Error(res.statusText)
      }
    })
    .then(data => {
      if (data.message) {
        console.log(formatErrors(data.message))
        Swal.fire({ icon: 'error', html: formatErrors(data.message) })
      } else {
        dispatch(createCohort(data))
        Swal.fire({ icon: 'success', text: data.compliment })
      }
    })
    .catch(alert => { 
      Swal.fire({ icon: 'error', text: alert })
    })
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
      if (res.ok || res.status === 406) {
        return res.json()
      } else {
        throw new Error(res.statusText)
      }
    })
    .then(cohort => {
      if (data.message) {
        Swal.fire({ icon: 'error', html: formatErrors(data.message) })
      } else {
        dispatch(createCohort(cohort))
        Swal.fire({ icon: 'success', text: data.compliment })
      }
    })
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
      if (res.ok || res.status === 406) {
        return res.json()
      } else {
        throw new Error(res.statusText)
      }
    })
    .then(data => { 
      if (data.message) {
        Swal.fire({ icon: 'error', html: formatErrors(data.message) })
      } else {
        dispatch(updateCohort(data))
        Swal.fire({ icon: 'success', text: data.compliment })
      }
    })
    .catch(alert => Swal.fire({ icon: 'error', text: alert }))
  }
}

export const handleRedirect = bool => ({ type: HANDLE_REDIRECT, payload: bool })