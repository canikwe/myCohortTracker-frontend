import { BASE_URL, FETCH_GROUPS, CREATE_GROUP, HEADERS, UPDATE_GROUP, DELETE_GROUP } from './constants'

const fetchGroups = groups => ({type: FETCH_GROUPS, payload: groups})

export const fetchingGroups = () => {
  return dispatch => {
    fetch(BASE_URL + 'groups')
    .then(res => res.json())
    .then(groups => dispatch(fetchGroups(groups)))
  }
}

const createGroup = group => ({type: CREATE_GROUP, payload: group})

export const creatingGroup = data => {
  return dispatch => {
    fetch(BASE_URL + 'groups', {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(group => dispatch(createGroup(group)))
  }
}

const updateGroup = group => ({type: UPDATE_GROUP, payload: group})

export const updatingGroup = data => {
  return dispatch => {
    fetch(BASE_URL + 'groups/' + data.group.id, {
      method: 'PATCH',
      headers: HEADERS,
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(group => dispatch(updateGroup(group)))
  }
}

const deleteGroup = group => ({type: DELETE_GROUP, payload: group})

export const deletingGroup = group => {
  return dispatch => {
  fetch(BASE_URL + 'groups/' + group.id, {
    method: 'DELETE'
  })
  .then(res => res.json())
  .then(group => dispatch(deleteGroup(group)))
  }
}