import { FETCH_COHORTS, BASE_URL, CREATE_COHORT, HEADERS } from "./constants";


const fetchCohorts = cohorts => ({ type: FETCH_COHORTS, payload: cohorts })

export const fetchingCohorts = () => {
  return dispatch => {
    fetch(BASE_URL + 'cohorts')
    .then(res => res.json())
    .then(cohorts => dispatch(fetchCohorts(cohorts)))
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