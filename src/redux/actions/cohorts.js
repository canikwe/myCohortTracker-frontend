import { FETCH_COHORTS, BASE_URL, CREATE_COHORT, HEADERS, FETCH_COHORT } from "./constants";


const fetchCohorts = cohorts => ({ type: FETCH_COHORTS, payload: cohorts })

export const fetchingCohorts = () => {
  return dispatch => {
    fetch(BASE_URL + 'cohorts')
    .then(res => res.json())
    .then(cohorts => dispatch(fetchCohorts(cohorts)))
  }
}

const fetchCohort = cohortData => ({ type: FETCH_COHORT, payload: cohortData })

export const fetchingCohort = batch_id => {
  return dispatch => {
    fetch(BASE_URL + 'cohorts/' + batch_id)
    .then(res => res.json())
    .then(cohortData => dispatch(fetchCohort(cohortData)))
  }
}

const createCohort = cohort => ({type: CREATE_COHORT, payload: cohort})

export const creatingCohort = data => {

  return dispatch => {
    fetch(BASE_URL + 'cohorts', {
      method: 'POST',
      headers: HEADERS,
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
      // headers: HEADERS,
      body: formData
    })
    .then(res => res.json())
    .then(cohort => dispatch(createCohort(cohort)))
  }
}