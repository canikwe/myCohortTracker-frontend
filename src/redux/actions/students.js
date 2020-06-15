import { BASE_URL, UPDATE_STUDENT, CREATE_STUDENT, HEADERS, DELETE_STUDENT } from './constants'
import Swal from 'sweetalert2'

const updateStudent = student => ({type: UPDATE_STUDENT, payload: student})

export const updatingStudent = data => {
  return dispatch => {
    fetch(BASE_URL + 'students/' + data.id, {
      method: 'PATCH',
      headers: { ...HEADERS, Authorization: `Bearer ${localStorage.getItem('token')}` },
      body: JSON.stringify(data)
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error(res.statusText)
      }
    })
    .then(student => {
      dispatch(updateStudent(student))
    })
    .catch(alert => Swal.fire({ icon: 'error', text: alert }))
  }
}

const createStudent = student => ({type: CREATE_STUDENT, payload: student})

export const creatingStudent = data => {
  return dispatch => {
    fetch(BASE_URL + 'students/', {
      method: 'POST',
      headers: { ...HEADERS, Authorization: `Bearer ${localStorage.getItem('token')}` },
      body: JSON.stringify(data)
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error(res.statusText)
      }
    })
    .then(student => {
      dispatch(createStudent(student))
    })
    .catch(alert => Swal.fire({ icon: 'error', text: alert }))
  }
}

const deleteStudent = student => ({type: DELETE_STUDENT, payload: student})

export const deletingStudent = data => {
  return dispatch => {
    fetch(BASE_URL + 'students/' + data.id, {
      method: 'DELETE',
      headers: { ...HEADERS, Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error(res.statusText)
      }
    })
    .then(student => {
      dispatch(deleteStudent(student))
    })
    .catch(alert => Swal.fire({ icon: 'error', text: alert }))
  }
}