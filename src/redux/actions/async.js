import { FETCH_STUDENTS, BASE_URL, FETCH_COHORT, FETCH_GROUPS, CREATE_GROUP, HEADERS } from './constants'

const fetchCohort = cohort => ({ type: FETCH_COHORT, payload: cohort })

export const fetchingCohort = () => {
  return dispatch => {
    return fetch(BASE_URL + 'cohorts')
      .then(res => res.json())
      .then(cohort => dispatch(fetchCohort(cohort)))
  }
}

const fetchStudents = students => ({type: FETCH_STUDENTS, payload: students})

export const fetchingStudents = () => {
  return dispatch => {
    return fetch(BASE_URL + 'students')
    .then(res => res.json())
    .then(students => dispatch(fetchStudents(students)))
  }
}

const fetchGroups = groups => ({type: FETCH_GROUPS, payload: groups})

export const fetchingGroups = () => {
  return dispatch => {
    return fetch(BASE_URL + 'groups')
    .then(res => res.json())
    .then(groups => dispatch(fetchGroups(groups)))
  }
}

const createGroup = group => ({type: CREATE_GROUP, payload: group})

export const creatingGroup = data => {
  return dispatch => {
    return fetch(BASE_URL + 'groups', {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(group => dispatch(createGroup(group)))
  }
}
