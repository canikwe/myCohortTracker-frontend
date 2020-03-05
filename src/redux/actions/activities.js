import { FETCH_ACTIVITIES, BASE_URL, SHOW_ACTIVITY_SEARCH, SHOW_ACTIVITY_CREATE, SEARCH_ACTIVITY, CANCEL_ACTIVITY_SEARCH, SELECT_ACTIVITY, RESET_SELECTED_ACTIVITY, CHANGE_ACTIVITY_FORM, CLOSE_CREATE_ACTIVITY_FORM, CREATE_ACTIVITY, HEADERS} from './constants'

// async actions
const fetchActivities = activities => ({type: FETCH_ACTIVITIES, payload: activities})

export const fetchingActivities = () => {
  return dispatch => {
    fetch(BASE_URL + 'activities')
    .then(res => res.json())
    .then(activities => dispatch(fetchActivities(activities)))
  }
}

const createActivity = activity => ({type: CREATE_ACTIVITY, payload: activity})

export const creatingActivity = data => {
  return dispatch => {
    fetch(BASE_URL + 'activities', {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(activity => dispatch(createActivity(activity)))
  }
}

// toggles
export const showActivityCreate = activitySearchTerm => ({ type: SHOW_ACTIVITY_CREATE, payload: activitySearchTerm })

// activity search actions
export const showActivitySearch = () => ({ type: SHOW_ACTIVITY_SEARCH })
export const searchActivity = event => ({ type: SEARCH_ACTIVITY, payload: event.target.value })
export const cancelActivitySearch = () => ({ type: CANCEL_ACTIVITY_SEARCH })
export const selectActivity = activity => ({ type: SELECT_ACTIVITY, payload: activity })
export const resetSelectedActivity = () => ({ type: RESET_SELECTED_ACTIVITY })

// activity create actions
export const changeActivityForm = event => ({ type: CHANGE_ACTIVITY_FORM, payload: event })
export const closeActivityCreateForm = () => ({type: CLOSE_CREATE_ACTIVITY_FORM})