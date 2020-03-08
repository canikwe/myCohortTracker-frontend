import { FETCH_STUDENTS, BASE_URL, LOGIN_INSTRUCTOR, HEADERS, TOKEN_HEADERS } from './constants'
import { fetchingActivities } from './activities'
import { fetchingCohorts } from './cohorts'
import { updateLoading } from '.'

const fetchStudents = students => ({type: FETCH_STUDENTS, payload: students})

export const fetchingStudents = () => {
  return dispatch => {
    return fetch(BASE_URL + 'students')
    .then(res => res.json())
    .then(students => dispatch(fetchStudents(students)))
  }
}

export const loginInstructor = bool => ({type: LOGIN_INSTRUCTOR, payload: bool})

export const loggingIn = data => {
  return dispatch => {
    fetch(BASE_URL + 'login', {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({instructor: data})
    })
    .then(res => res.json())
    .then(loginData => {
      if (!loggingIn.message) {
        localStorage.setItem('token', loginData.jwt)
        dispatch(loginInstructor(true))
        dispatch(fetchingCohorts())
        dispatch(fetchingActivities())
      } else {
        dispatch(loginInstructor(false))
        dispatch(updateLoading(false))
        localStorage.removeItem('token')
        alert(loginData.message)
      }
    })
  }
}

export const authorizingInstructor = () => {
  return dispatch => {
    if (localStorage.getItem('token')) {
      fetch(BASE_URL + 'token_login', {
        method: 'POST',
        headers: TOKEN_HEADERS
      })
      .then(res => res.json())
      .then(data => {
        if (!data.message) {
          dispatch(loginInstructor(true))
          dispatch(fetchingCohorts())
          dispatch(fetchingActivities())
        } else {
          dispatch(loginInstructor(false))
          dispatch(updateLoading(false))
          localStorage.removeItem('token')
          alert(data.message)
        }
      })
    } else {
      dispatch(loginInstructor(false))
      dispatch(updateLoading(false))
    }
  }
}

