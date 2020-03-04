import { FETCH_ACTIVITIES, BASE_URL } from './constants'

const fetchActivities = activities => ({type: FETCH_ACTIVITIES, payload: activities})

export const fetchingActivities = () => {
  return dispatch => {
    fetch(BASE_URL + 'activities')
    .then(res => res.json())
    .then(activities => dispatch(fetchActivities(activities)))
  }
}