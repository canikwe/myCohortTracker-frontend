import { FETCH_COHORTS, BASE_URL, CREATE_COHORT, FETCH_COHORT, UPDATE_COHORT, TOKEN_HEADERS, AUTH_HEADERS } from "./constants";
import { updateLoading } from ".";


const fetchCohorts = cohorts => ({ type: FETCH_COHORTS, payload: cohorts })

export const fetchingCohorts = () => {
  return dispatch => {
    fetch(BASE_URL + 'cohorts', {
      headers: TOKEN_HEADERS
    })
    .then(res => res.json())
    .then(cohorts => dispatch(fetchCohorts(cohorts)))
  }
}

const fetchCohort = cohortData => ({ type: FETCH_COHORT, payload: cohortData })

export const fetchingCohort = batch_id => {
  return dispatch => {
    dispatch(updateLoading(true))
    fetch(BASE_URL + 'cohorts/' + batch_id, {
      headers: TOKEN_HEADERS
    })
    .then(res => res.json())
    .then(cohortData => {
      dispatch(updateLoading(false))
      dispatch(fetchCohort(cohortData))
    })
  }
}

const createCohort = cohort => ({type: CREATE_COHORT, payload: cohort})

export const creatingCohort = data => {

  return dispatch => {
    fetch(BASE_URL + 'cohorts', {
      method: 'POST',
      headers: TOKEN_HEADERS,
      body: JSON.stringify({cohort: data})
    })
    .then(res => res.json())
    .then(cohort => dispatch(createCohort(cohort)))
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
      headers: AUTH_HEADERS,
      body: formData
    })
    .then(res => res.json())
    .then(cohort => dispatch(createCohort(cohort)))
  }
}

const updateCohort = data => ({type: UPDATE_COHORT, payload: data})

export const updatingCohort = data => {
  return dispatch => {
    fetch(BASE_URL + 'cohorts/' + data.id, {
      method: 'PATCH',
      headers: TOKEN_HEADERS,
      body: JSON.stringify({ cohort: data })
    })
    .then(res => res.json())
    .then(data => dispatch(updateCohort(data)))

  }
}