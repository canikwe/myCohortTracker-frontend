import { FETCH_STUDENTS, BASE_URL, LOGIN_USER, HEADERS } from './constants'
import { fetchingActivities } from './activities'
import { fetchingCohorts } from './cohorts'
import { updateLoading } from '.'
import Swal from 'sweetalert2'

const fetchStudents = students => ({type: FETCH_STUDENTS, payload: students})

export const fetchingStudents = () => {
  return dispatch => {
    return fetch(BASE_URL + 'students')
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error(res.statusText)
      }
    })
    .then(students => dispatch(fetchStudents(students)))
    .catch(alert => Swal.fire({ icon: 'error', text: alert }))
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
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error(res.statusText)
      }
    })
    .then(loginData => {
      if (!loginData.message) {
        localStorage.setItem('token', loginData.jwt)
        dispatch(loginUser(true))
        dispatch(fetchingCohorts())
        dispatch(fetchingActivities())
      } else {
        dispatch(loginUser(false))
        dispatch(updateLoading(false))
        localStorage.removeItem('token')
        Swal.fire({ icon: 'error', text: loginData.message })
      }
    })
    .catch(alert => Swal.fire({ icon: 'error', text: alert }))
  }
}

export const authorizingUser = () => {
  return dispatch => {
    if (localStorage.getItem('token')) {
      fetch(BASE_URL + 'token_login', {
        method: 'POST',
        headers: { ...HEADERS, Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error(res.statusText)
        }
      })
      .then(data => {
        if (!data.message) {
          dispatch(loginUser(true))
          dispatch(fetchingCohorts())
          dispatch(fetchingActivities())
        } else {
          dispatch(loginUser(false))
          dispatch(updateLoading(false))
          localStorage.removeItem('token')
          Swal.fire({icon: 'error', text: data.message})
        }
      })
      .catch(alert => Swal.fire({icon: 'error', text: alert}))
    } else {
      dispatch(loginUser(false))
      dispatch(updateLoading(false))
    }
  }
}

export const loggingInWithGoogle = res => {
  if (res) {

    return dispatch => {
      fetch(BASE_URL + 'google_login', {
        method: 'POST',
        headers: {...HEADERS, Authorization: `Bearer ${res}`}
      })
      .then(res => {
        
        if (res.ok){
          return res.json()
        } else {
          throw new Error(res.json())
        }
      })
      .then(data => {
        localStorage.setItem('token', data.token)
        dispatch(loginUser(true))
        dispatch(fetchingCohorts())
        dispatch(fetchingActivities())
      })
      .catch(err => {
        localStorage.removeItem('token')
        dispatch(loginUser(false))
        dispatch(updateLoading(false))
        Swal.fire({
          icon: 'error', 
          text: "You can't GIT with us... Please sign in again with a Flatiron email account." 
        })
      })
    }
  }
}