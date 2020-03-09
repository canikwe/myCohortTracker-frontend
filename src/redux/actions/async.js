import { FETCH_STUDENTS, BASE_URL, LOGIN_USER, HEADERS } from './constants'
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

export const loginUser = bool => ({type: LOGIN_USER, payload: bool})

export const loggingIn = data => {
  return dispatch => {
    fetch(BASE_URL + 'login', {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({user: data})
    })
    .then(res => res.json())
    .then(loginData => {
      if (!loginData.message) {
        // debugger
        localStorage.setItem('token', loginData.jwt)
        dispatch(loginUser(true))
        dispatch(fetchingCohorts())
        dispatch(fetchingActivities())
      } else {
        dispatch(loginUser(false))
        dispatch(updateLoading(false))
        localStorage.removeItem('token')
        alert(loginData.message)
      }
    })
  }
}

export const authorizingUser = () => {
  return dispatch => {
    if (localStorage.getItem('token')) {
      fetch(BASE_URL + 'token_login', {
        method: 'POST',
        headers: { ...HEADERS, Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      .then(res => res.json())
      .then(data => {
        if (!data.message) {
          // debugger
          dispatch(loginUser(true))
          dispatch(fetchingCohorts())
          dispatch(fetchingActivities())
        } else {
          dispatch(loginUser(false))
          dispatch(updateLoading(false))
          localStorage.removeItem('token')
          alert(data.message)
        }
      })
    } else {
      dispatch(loginUser(false))
      dispatch(updateLoading(false))
    }
  }
}

