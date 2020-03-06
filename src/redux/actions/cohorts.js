import { FETCH_COHORTS, BASE_URL } from "./constants";


const fetchCohorts = cohorts => ({ type: FETCH_COHORTS, payload: cohorts })

export const fetchingCohorts = () => {
  return dispatch => {
    fetch(BASE_URL + 'cohorts')
    .then(res => res.json())
    .then(cohorts => dispatch(fetchCohorts(cohorts)))
  }
}