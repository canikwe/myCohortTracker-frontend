import { FETCH_STUDENTS, BASE_URL } from './constants'

const fetchStudents = students => ({type: FETCH_STUDENTS, payload: students})

export const fetchingStudents = () => {
  return dispatch => {
    return fetch(BASE_URL + 'students')
    .then(res => res.json())
    .then(students => dispatch(fetchStudents(students)))
  }
}
