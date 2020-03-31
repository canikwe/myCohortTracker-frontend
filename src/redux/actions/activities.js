import { FETCH_ACTIVITIES, BASE_URL, SHOW_ACTIVITY_CREATE, SEARCH_ACTIVITY, SELECT_ACTIVITY, RESET_SELECTED_ACTIVITY, CLOSE_CREATE_ACTIVITY_FORM, CREATE_ACTIVITY, HEADERS} from './constants'
import { updateLoading } from '.'

// async actions
const fetchActivities = activities => ({type: FETCH_ACTIVITIES, payload: activities})

export const fetchingActivities = () => {
  return dispatch => {
    dispatch(updateLoading(true))
    fetch(BASE_URL + 'activities', {
      headers: { ...HEADERS, Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error(res.statusText)
      }
    })
    .then(activities => {
      dispatch(updateLoading(false))
      dispatch(fetchActivities(activities))
    })
    .catch(alert)
  }
}

const createActivity = activity => ({type: CREATE_ACTIVITY, payload: activity})

export const creatingActivity = data => {
  return dispatch => {
    fetch(BASE_URL + 'activities', {
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
    .then(activity => dispatch(createActivity(activity)))
    .catch(alert)
  }
}

// toggles
export const showActivityCreate = activitySearchTerm => ({ type: SHOW_ACTIVITY_CREATE, payload: activitySearchTerm })

// activity search actions
// export const showActivitySearch = () => ({ type: SHOW_ACTIVITY_SEARCH })
export const searchActivity = event => ({ type: SEARCH_ACTIVITY, payload: event.target.value })
export const selectActivity = activity => ({ type: SELECT_ACTIVITY, payload: activity })
export const resetSelectedActivity = () => ({ type: RESET_SELECTED_ACTIVITY })

// activity create actions
export const closeActivityCreateForm = () => ({type: CLOSE_CREATE_ACTIVITY_FORM})