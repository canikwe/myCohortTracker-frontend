import { BASE_URL, CREATE_GROUP, UPDATE_GROUP, DELETE_GROUP, SELECT_GROUP, HEADERS } from './constants'

// async actions
const createGroup = group => ({type: CREATE_GROUP, payload: group})

export const creatingGroup = data => {
  return dispatch => {
    fetch(BASE_URL + 'groups', {
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
    .then(group => dispatch(createGroup(group)))
    .catch(alert)
  }
}

const updateGroup = group => ({type: UPDATE_GROUP, payload: group})

export const updatingGroup = data => {
  return dispatch => {
    fetch(BASE_URL + 'groups/' + data.group.id, {
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
    .then(group => dispatch(updateGroup(group)))
    .catch(alert)
  }
}

const deleteGroup = group => ({type: DELETE_GROUP, payload: group})

export const deletingGroup = group => {
  return dispatch => {
    fetch(BASE_URL + 'groups/' + group.id, {
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
    .then(group => dispatch(deleteGroup(group)))
    .catch(alert)
  }
}

export const selectGroup = group => ({type: SELECT_GROUP, payload: group})
