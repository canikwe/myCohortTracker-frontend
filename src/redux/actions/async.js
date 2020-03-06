import { FETCH_STUDENTS, BASE_URL, FETCH_COHORT } from './constants'

// const fetchCohort = cohort => ({ type: FETCH_COHORT, payload: cohort })

// export const fetchingCohort = batch_id => {
//   return dispatch => {
//     return fetch(BASE_URL + 'cohorts/' + batch_id)
//       .then(res => res.json())
//       .then(cohort => dispatch(fetchCohort(cohort)))
//   }
// }

const fetchStudents = students => ({type: FETCH_STUDENTS, payload: students})

export const fetchingStudents = () => {
  return dispatch => {
    return fetch(BASE_URL + 'students')
    .then(res => res.json())
    .then(students => dispatch(fetchStudents(students)))
  }
}

