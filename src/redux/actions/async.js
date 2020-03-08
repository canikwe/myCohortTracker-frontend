import { FETCH_STUDENTS, BASE_URL, FETCH_COHORT, LOGIN_INSTRUCTOR, HEADERS } from './constants'

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

const loginInstructor = data => ({type: LOGIN_INSTRUCTOR, payload: data})

export const loggingIn = data => {
  return dispatch => {
    fetch(BASE_URL + '/login', {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({instructor: data})
    })
    .then(res => res.json())
    .then(loginData => {
      if (!loggingIn.message) {
        localStorage.setItem('token', loginData.jwt)
        dispatch(loginInstructor(loginData))
      } else {
        alert(loginData.message)
      }
    })
  }
}

